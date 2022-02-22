# MSDE Software Architecture 2022

Modeling Assignment Repository

## Getting started

```
yarn install
brew install plantuml
```

## Building the document 

```
yarn build
```

The document [Markdown](https://www.markdownguide.org/cheat-sheetplan) and [PlantUML](https://plantuml.com/) source is found in the `src` folder.

The HTML output is stored in the `upload` folder.

## Clean the Output
```
yarn clean
```

## Continuous Build
```
yarn watch
```

This requires `yarn global add onchange` to work. It will automatically rebuild the documentation when the source files are modified. Stop it using `^C`.


## Submitting Your Work

After adding (with `git add`) whatever file you have modified (please also include the generated files inside the `upload` folder), use the following commit message to indicate your work is ready to be checked:

```
git commit -m "exercise N complete, please check"
git push
```

We will use github issues to provide feedback about your model. 

Also, be ready to present your submission according to the [schedule](https://www.icorsi.ch/mod/url/view.php?id=769516).

