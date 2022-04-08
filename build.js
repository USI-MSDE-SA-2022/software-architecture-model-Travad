const { PerformanceObserver, performance } = require('perf_hooks');
let t_start = performance.now();

process.on('exit', function() {
    let t_end = performance.now();
    console.log("Done in " + (t_end - t_start) + "ms");
});

const fs = require('fs-extra');
const glob = require('glob-fs')({ gitignore: true });
const marked = require('marked');
var plantuml = require('plantuml');


const child_process = require('child_process');


function run(cmd, cwd, done) {

    console.log(cmd);

    const exec = child_process.exec;
    exec(cmd, { cwd }, (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err);
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (typeof done == "function") {
                done(err, stdout, stderr);
            } else {}
        }
    });

}


const build_json = fs.readJSONSync('build.json', { throws: false }) || {};

build_json.doc_build = (build_json.doc_build || 0) + 1;

fs.outputJsonSync('build.json', build_json, { spaces: 2 });


String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const cache_json = fs.readJSONSync('./upload/puml_cache.json', { throws: false }) || {};


function cache_lookup(text, miss) {
    let hash = new String(text).hashCode();

    if (cache_json[hash]) { //hit
        return new Promise((resolve,reject)=>resolve(cache_json[hash]));
    } else {
        return miss(text).then((output) => {
            cache_json[hash] = output;
            fs.outputJson('./upload/puml_cache.json', cache_json, { spaces: 2 });
            return output;
        })
    }
}


let puml_count = 0;
let epuml_count = 0;
let fml_count = 0;

const renderer = new marked.Renderer();

renderer._paragraph = renderer.paragraph;

renderer.paragraph = function(text) {

    //console.log(text);

    if (text.trim().startsWith("{")) {

        renderer.sec_depth = renderer.sec_depth || 0;
        renderer.sec_depth++;

        let c = text.split(".");
        c.shift();

        if (c.length>0) {
            return `<section class="${c.join(" ")}">`;
        } else {
            return "<section>"
        }
    }

    if (text.trim().startsWith("}")) {

        renderer.sec_depth = renderer.sec_depth || 0;
        renderer.sec_depth--;

        return "</section>"
    }

    if (text.trim().startsWith("Pass: ") && renderer.sec_depth > 0) {
        return `<section class="pass"><span>&starf;&star;&star;: </span>${text.split("Pass: ")[1]}</section>`;
    }
    if (text.trim().startsWith("Good: ") && renderer.sec_depth > 0) {
        return `<section class="ok"><span>&starf;&starf;&star;: </span>${text.split("Good: ")[1]}</section>`;
    }
    if (text.trim().startsWith("Exceed: ") && renderer.sec_depth > 0) {
        return `<section class="exceed"><span>&starf;&starf;&starf;: </span>${text.split("Exceed: ")[1]}</section>`;
    }
    if (text.trim().startsWith("Hint: ") && renderer.sec_depth > 0) {
        return `<section class="hint"><span>Hint: </span>${text.split("Hint: ")[1]}</section>`;
    }

    return renderer._paragraph(text);
}

renderer._code = renderer.code;

renderer.code = function(code, infostring, escaped) {
    //console.log(code, infostring, escaped);
    if (infostring) {
        if (infostring.startsWith("puml")) {
            let i = epuml_count++;
            cache_lookup(code, ()=>plantuml(code)).then(svg=>{
                fs.writeFile(renderer._out_folder+"puml_e"+i+".svg", svg)
            })
            return `<img src="./puml_e${i}.svg">`;
        } 
    }
    return renderer._code(code, infostring, escaped);

};

renderer._image = renderer.image;

renderer.image = function(href, title, text) {

    //console.log(href, title, text);

    if (href.endsWith(".puml")) {

        let i = puml_count++;

        fs.readFile(href.replace("./",renderer._in_folder)).then(puml=>{
            return cache_lookup(puml, ()=>plantuml(puml))
            //return plantuml(puml)
        }).then(svg=>{
            fs.writeFile(renderer._out_folder+"puml_"+i+".svg", svg)
        })

        return `<img src="./puml_${i}.svg" alt="${text}">`;

    }

    if (href.endsWith(".fml")) {

        let i = fml_count++;

        const fml_output = renderer._out_folder+"fml_"+i+".svg";

        run("node fml " + href.replace("./",renderer._in_folder) + " " + fml_output);

        return `<img src="./fml_${i}.svg" alt="${text}">`;

    }

    if (href.endsWith(".c5")) {

        let i = fml_count++;

        const fml_output = renderer._out_folder+"c5_"+i+".svg";

        run("node c5 " + href.replace("./",renderer._in_folder) + " " + fml_output);

        return `<img src="./c5_${i}.svg" alt="${text}">`;

    }

    if (href.endsWith(".madr")) {

        let md = fs.readFileSync(href.replace("./",renderer._in_folder));

        return `<h3>${text}</h3>` + marked.parse("" + new String(md));

    }

    return renderer._image(href, title, text);

}

renderer._heading = renderer.heading;

let task_count = 0;

renderer.heading = function(text, level, raw, slugger) {

    // console.log(text);

    if (text.indexOf("Ex -") >= 0) {
        task_count++;
        text = text.replace("Ex -", `<span class='task'>${task_count}.</span> `);
    }

    // let sec = "<section>"

    // if (task_count > 1) {
    //     sec = "</section>" + sec;
    // }

    return renderer._heading(text, level, raw, slugger);
};


marked.setOptions({
    renderer, //: new marked.Renderer(),
    highlight: function(code) {
        return code; //require('highlight').highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

function loadMD(f, vars = {}) {

    let txt = "" + new String(fs.readFileSync(f));

    if (txt.indexOf("---") >= 0) {

        let parts = txt.split("\n---\n");

        parts.slice(0, -1).forEach(p => {
            let lines = p.split("\n");
            let k = lines[0].split(":");
            vars[k[0]] = lines.slice(1).join("\n");
        });

        txt = parts[parts.length - 1];

    }

    //convert strings to booleans
    Object.keys(vars).forEach(k => {
        if (vars[k] === "false") vars[k] = false;
        if (vars[k] === "true") vars[k] = true;
    })

    task_count = 0;

    return { md: marked.parse(txt), meta: vars };
}


let ejs = require('ejs');

let views = {}

function render_one(model, out_file, template) {
    
    model.out_file = out_file;

    views[template] = views[template] || new String(fs.readFileSync("./template/"+template+".ejs"));

    let html = ejs.render(views[template], model);

    fs.ensureFileSync(out_file);
    fs.writeFileSync(out_file, html);

};


var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push({ name: file, stat });
                    next();
                }
            });
        })();
    });
};



function deltaBuild() {
    let old_file_list = {};
    try {
        old_file_list = fs.readJsonSync('upload/files.json');
    } catch (e) {}

    walk("src", function(err, list) {
        // console.log(list);

        let flat = {};
        list.filter((f) => !f.name.endsWith(".DS_Store")).forEach(f => {
            flat[f.name] = f.stat;
        });

        let todo = {};

        let deleted = {};
        Object.keys(old_file_list).forEach(k => { deleted[k] = old_file_list[k] });

        let changed = [];

        function extract_dir(k) {
            let a = k.split("/")
            return a.slice(1, 3).join("/");
        }

        function push(k) {
            let d = extract_dir(k);
            todo[d] = (todo[d] || 0) + 1;

            changed.push(k);
        }

        Object.keys(flat).forEach((k) => {
            if (old_file_list[k]) {
                if (flat[k].mtimeMs != old_file_list[k].mtimeMs) {
                    push(k);
                }
                delete deleted[k]; //k was found so what's left over should have been deleted
            } else {
                push(k); //this is a new addition
            }
        });

        fs.writeJson("upload/files.json", flat);

        console.log('Changed', changed);
        console.log('Deleted', Object.keys(deleted));

        if (Object.keys(todo).length == 0) {
            todo['sa/model'] = 1;
        }

        //todo['exercises/8-ws'] = 1;

        if (Object.keys(todo).indexOf('templates/doc.ejs') != -1) {
            todo = Array.from(new Set(Object.keys(flat).map(extract_dir))).reduce((a, c) => { a[c] = 1; return a; }, {});
            delete todo['templates/doc.ejs'];
        }

        Object.keys(todo).filter(k => k.endsWith('meta.json')).forEach(mk => {
            delete todo[mk];
            Array.from(new Set(Object.keys(flat).map(extract_dir))).filter(k => k.startsWith(mk.split("/")[0])).forEach(k => {
                todo[k] = 1;
            })
        })

        console.log("Building", todo);

        Object.keys(todo).forEach(buildDoc.bind(null, changed, Object.keys(deleted)));

    })
}

function buildDoc(changed, deleted, slide) {

    console.log("Building " + slide);

    let md_path = "./src/" + slide + "/index.md";

    let md = { meta: {} };

    let meta_path = "./src/" + slide.split("/")[0] + "/meta.json";
    try {
        md.meta = fs.readJSONSync(meta_path);
    } catch (e) {
        //console.log(e);
    }

    md.meta.build = build_json.doc_build;
    //md.meta.lecture = "Web Atelier 2020 ";
    md.meta.timestamp = new Date().toLocaleString();

    if (fs.existsSync(md_path) && fs.lstatSync(md_path).isFile()) {

        renderer._out_folder = `./upload/${slide}/`;
        renderer._in_folder = `./src/${slide}/`;

        md = loadMD(md_path, md.meta);

        md.meta.series = "";

        let model = { title: slide, md: md.md, meta: md.meta, pid: slide + "." + build_json.build }

        let mdout = `./upload/${slide}/index.html`;

        render_one(model, mdout, 'doc');

    }

}

fs.ensureDirSync("upload/");
deltaBuild();