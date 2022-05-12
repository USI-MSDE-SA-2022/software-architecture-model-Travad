title: 
Software Architecture Model of FruitDash by Daniel Travaglia
---
 
# Getting started

You will use [Markdown](https://www.markdownguide.org/cheat-sheetplan) and [PlantUML](https://plantuml.com/) to describe a software architecture model about your own project.

This document will grow during the semester as you sketch and refine your software architecture model.

When you are done with each task, please push so we can give you feedback about your work.

We begin by selecting a suitable project domain.


# Ex - Domain Selection 

{.instructions

Submit the name and brief description (about 100 words) of your domain using the following vision statement template:

```
For [target customers]
Who [need/opportunity/problem]
The [name your project]
Is  [type of project]
That [major features, core benefits, compelling reason to buy]
Unlike [current reality or competitors]
Our Project [summarize main advantages over status quo, unique selling point]
```

Please indicate if your choice is:

* a project you have worked on in the past (by yourself or with a team)
* a project you are going to work on this semester in another lecture (which one?)
* a new project you plan to build in the future
* some existing open source project you are interested to contribute to

The chosen domain should be unique for each student.

Please be ready to give a 2 minute presentation about it (you can use a slide but it's not necessary)

Hint: to choose a meaningful project look at the rest of the modeling tasks which you are going to perform in the context of your domain.

}

Project Name: *FruitDash*

Project Type: Web application

Vision Statement: 
  For small-medium enterprise employees, 
  who need to make decisions based on clear visualized information, 
  FruitDash is a web-based dashboard that displays metrics based on the fruit and vegetable orders of their clients.
  Unlike Excel, 
  Fruitdash provides the required information instantaneously to speed up the decision-making process
  and enables the sharing of consistent information across the whole company. 
   
Additional Information: This is a project that I aim to build in the future. The dashboard
should be accessible by multiple users at the same time and it should be built so that it respects
conventions on how information should be displayed using tables and graphs. Furthermore, the application
will be built using ASP.NET Core Framework (C#) and SQL Server as the database technology for retrieving data.

# Ex - Architectural Decision Records

{.instructions

Software architecture is about making design decisions that will impact the quality of the software you plan to build.

Let's practice how to describe an architectural decision. We will keep using ADRs to document architectural decisions in the rest of the model.

Use the following template to capture one or more architectural design decisions in the context of your project domain

Pass: 1 ADR

Good: 2 ADR

Exceed: >2 ADR

}

<!-- ![Architectural Decision Record Template](./examples/decision-template.madr) -->

## ADR #1

### 1. What did you decide?
<!-- Give a short title of solved problem and solution -->
I decided to adopt an external product as the go-to tool to develop the company dashboard.

### 2. What was the context for your decision?
<!-- What is the goal you are trying to achieve? -->
<!-- What are the constraints? -->
<!-- What is the scope of your decision? Does it affect the entire architecture? -->
We need to decide whether to adopt a third-party application or to build one from scratch. The factors involved in this decision are mainly to keep data consistent across users, make sure that multiple users can access the product concurrently as well as to provide simple yet captivating visualization. To consider is also that the data of the client is already stored in a Microsoft SQL Server database. This decision deeply influences the choices on the expertise needed to develop the project as well as the technology to adopt.

### 3. What is the problem you are trying to solve?
<!-- You may want to articulate the problem in form of a question. -->
Would it be better to adopt an already existing solution on top of which we can build our final product or should we opt for an in-house solution?

### 4. Which alternative options did you consider?
<!-- List at least 3 options -->
1. Internal solution: an Office Adds-in for Excel
2. Internal solution: a web framework solution 
3. External solution: Microsoft Power BI

### 5. Which one did you choose?
<!-- Pick one of the options as the outcome of your decision -->
I picked to go for the external solution and therefore adopt the Microsoft Power BI platform.

### 6. What is the main reason for that?
<!-- List the positive consequences (pros) of your decision: -->
<!-- quality improvement, satisfaction of external constraint. If any, list the negative consequences (cons), quality degradation -->
Microsoft Power BI provides a friendly and easy-to-use environment to create modern dashboards. Besides the possibility to share the dashboard with multiple users in real-time, the killer feature of this solution is the ability to translate natural language requests for scouting data. The tool provides a connector to extract data from Microsoft SQL database. Moreover, as the data stored has a low disk footprint and the tool subscription is free up to 1GB of data loaded per user, it also grants low costs. Providing the same features with a solution built from scratch might results in far greater costs and might also provide less features. On the other hand, it would grant more flexibility when it comes to personalize the dashboard for ad-hoc analyses.

## ADR #2

### 1. What did you decide?
<!-- Give a short title of solved problem and solution -->
<!-- Allow the download of Excel for the data that is visualized on the dashboard > -->
Allow the download of visualized data directly from the dashboard in Excel format. 

### 2. What was the context for your decision?
<!-- What is the goal you are trying to achieve? -->
<!-- What are the constraints? -->
<!-- What is the scope of your decision? Does it affect the entire architecture? -->
The context of this decision is to allow the user to download data directly from the dashboard so to enable further or even ad-hoc analysis on a specific context. It should be made simple for the user to use (e.g. an Excel icon button link to click) but it should not have an impact on the visualizations, which clearly has the priority. There is no impact on the architectural side of the application.

### 3. What is the problem you are trying to solve?
<!-- You may want to articulate the problem in form of a question. -->
Introduce flexibility in the data analysis process for the user. 

### 4. Which alternative options did you consider?
<!-- List at least 3 options -->
1. An external service that retrieve data directly from the database and produce an ad-hoc Excel file.
2. A Microsoft Power BI plug-in service
3. Set up a recurrent job / task on the already existing database server 

### 5. Which one did you choose?
<!-- Pick one of the options as the outcome of your decision -->
The Microsoft Power BI plug-in solution.

### 6. What is the main reason for that?
<!-- List the positive consequences (pros) of your decision: -->
<!-- quality improvement satisfaction of external constraint If any, list the negative consequences (cons) quality degradation -->
This decision will allow the user to perform further analysis on any piece of information that is identified from the visualizations provided. 

A clear negative consequence of this decision is the cost involved, as it consists of a premium SaaS feature of the Microsoft Power BI software.

## ADR #3

### 1. What did you decide?
<!-- Give a short title of solved problem and solution -->
Provide additional security thanks to 2-factors authentication.

### 2. What was the context for your decision?
<!-- What is the goal you are trying to achieve? -->
<!-- What are the constraints? -->
<!-- What is the scope of your decision? Does it affect the entire architecture? -->
The current infrastructure of the company is built in such a way that information security is clearly a priority. The goal here is to keep information protected yet easily accessible. However, protecting information often introduces slowtimes and reduces the product usability. Nevertheless, as the client is particularly sensible to this topic, reduced usability should not represent a big problem.

### 3. What is the problem you are trying to solve?
<!-- You may want to articulate the problem in form of a question. -->
Keeping information secure.

### 4. Which alternative options did you consider?
<!-- List at least 3 options -->
1. SMS external provider 2-factors authentication
2. Microsoft Authentication service
3. Multi-factor authentication for Power BI

### 5. Which one did you choose?
<!-- Pick one of the options as the outcome of your decision -->
Multi-factor authentication for Power BI.

### 6. What is the main reason for that?
<!-- List the positive consequences (pros) of your decision: -->
<!-- quality improvement satisfaction of external constraint If any, list the negative consequences (cons) quality degradation -->
Two-factors authentication adds a layer of protection as to ensure the identify of the user and that the user has authorization to access the dashboard. On the other hand, it decreases usability and might have an impact on the usage frequency of the dashboard. 


# Ex - Quality Attribute Scenario

{.instructions

1. Pick a scenario for a specific quality attribute. Describe it with natural language.

2. Refine the scenario using the following structure:

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle Environment {

[Source] -> [System] : Stimulus

[System] -> [Measure] : Response

}

@enduml
```

*Stimulus*: condition affecting the system

*Source*: entity generating the stimulus

*Environment*: context under which stimulus occurred (e.g., build, test, deployment, startup, normal operation, overload, failure, attack, change)

*Response*: observable result of the stimulus

*Measure*: benchmark or target value defining a successful response

Pass: 3 scenarios

Good: >3 scenarios

Exceed: >6 scenarios using challenging qualities

}

<!-- ## Example Scenario

Quality: _Recoverability_

Scenario: In case of power failure, rebooting the system should take up to 20 seconds.

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "After Power has been restored" {

rectangle "Admin" as Source
rectangle "max 20s" as Measure

Source -> [System] : "Boot"

[System] -> [Measure] : "Online"

}

@enduml
```
  -->

## Scenario 1

Quality: _Compatibility_

Scenario: The user should be able to access the dashboard from any device.

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "When a user connects to the platform" {

rectangle "User" as Source
rectangle "Design consistency metrics" as Measure

Source -> [Device] : "Connects"

[Device] -> [Measure] : "Visualize"

}

@enduml
```

## Scenario 2

Quality: _Security_

Scenario: When the user authenticate, two-factor-authentication should fail with more than 3 attempts. 

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "Two-factors authentication" {

rectangle "User" as Source
rectangle "Max available attempts reached" as Measure

Source -> [System] : "(3x) Incorrect Authentications"

[System] -> [Measure] : "Error"

}

@enduml
```

<!-- {.feedback

Make the refined scenario more precise

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "two-factor-authentication" {

rectangle "User" as Source
rectangle "Max attempts reached" as Measure

Source -> [System] : "Incorrect Authentication (3x)"

[System] -> [Measure] : "Failure"

}

@enduml
```

} -->

## Scenario 3

Quality: _Capacity_

Scenario: The system should be able to handle requests from the maximum user's capacity of 100 users simultaneously.    

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "Normal Operation (with sufficient resources)" {

rectangle "Users" as Source
rectangle "Seamless performance" as Measure

Source -> [System] : "100 simultaneous connections"

[System] -> [Measure] : "Responds"

}

@enduml
```


<!-- {.feedback

Make the refined scenario more precise

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "Normal Operation (with sufficient resources)" {

rectangle "Users" as Source
rectangle "Acceptable Performance" as Measure

Source -> [System] : "100 simultaneous connections"

[System] -> [Measure] : "Responds"

}

@enduml
```

} -->

## Scenario 4

Quality: _Ease of Integration_

Scenario: It should be possible to retrieve the same application underlying data with 1 single consistent API.

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "When a program issues a request to the API" {

rectangle "Program" as Source
rectangle "The same base route (common prefix)" as Measure

Source -> [System] : "Issues a request"

[System] -> [Measure] : "Replies"

}

@enduml
```

## Scenario 5

Quality: _Ease of Support_

Scenario: In case of service failure, the user should receive support within 30 minutes. 

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "When a user encounters a system failure" {

rectangle "User" as Source
rectangle "Within 30 minutes" as Measure

Source -> [System] : "Interacts with the"

[System] -> [Measure] : "Triggers a failure and reply"

}

@enduml
```

## Scenario 6

Quality: _Time To Market_

<!-- {.feedback

Better quality:

- Time to Market

since no budget or cost is mentioned in the scenario

} -->

Scenario: As per customer request, the software should be ready within 4 months.

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "Time of development" {

rectangle "Customer" as Source
rectangle "4 months" as Measure

Source -> [System] : "Requests"

[System] -> [Measure] : "Within"

}

@enduml
```

## Scenario 7

Quality: _Privacy_

Scenario: As per customer request, when an account is canceled, all the related data should be deleted immediately.

```puml
@startuml

skinparam componentStyle rectangle
skinparam monochrome true
skinparam shadowing false

rectangle "A user cancels the account" {

rectangle "User" as Source
rectangle "Data unavailable" as Measure

Source -> [System] : "Cancel request"

[System] -> [Measure] : "Issue user data request"

}

@enduml
```

# Ex - Quality Attribute Tradeoff

{.instructions

Pick a free combination of two qualities on the [map](https://usi365.sharepoint.com/:x:/s/MSDE-2022-SoftwareArchitecture/ESVksoXVgMNHtKBKrIwatMYBqorOFaKjxnoqssEy0gNPCg?e=81W7SI) and write your name to claim it.

Then write a short text giving an example for the tradeoff in this assignment.

Pass: 1 unique trade-off

Good: 2 trade-offs

Exceed: >2 trade-offs

}

<!-- ## Portability vs. Performance (Example)

Developing an app natively for each OS is expensive and time consuming, but it benefits from a good performance. Choosing a cross-platform environment on the other hand simplify the development process, making it faster and cheaper, but it might suffer in performance. -->

## Feasibility vs. Defensibility

On one hand, we need to ensure that the software is protected from every possible external attack. However, to achieve this objective, time and money investments are critical, which would make the system less feasible. On the other hand, a developer would like to build an affordable architecture with the shortest possible time to market, often compromising defensibility.

## Reliability vs. Scalability

During development phase, one of the underlying objective of a developer is to make a system reliable, so that failures happen unfrequently. Nevertheless, if the focus shifts to scalable application, reliability might deteriorate. The software would have to deal with an increasing amount of requests and as such, failures would naturally occur more frequently.

## Compatibility vs. Modifiability

Ensuring that the user can access an application from multiple devices might lead to an increase in software's usability and flexibility, but it could also introduce design complexity and make it difficult to update the software. On the other hand, the developer could add additional features to the architecture, but would need to make sure that these changes are applied uniformly across the whole range of devices a user can use.

<!-- TODO -->
# Ex - Feature Modeling

{.instructions

In the context of your chosen project domain, describe your domain using a feature model.

The feature model should be correctly visualized using the following template:

![Example Feature Model Diagram](./examples/feature.puml)

If possible, make use of all modeling constructs.

Pass: Include at least 4 non-trivial features

Good: Include at least 6 non-trivial features, which are all implemented by your project

Exceed: Include more than 8 non-trivial features, indicate which are found in your project and which belong to one competitor

}

![Fruith Dash Modelling](./examples/fruitdash.puml)


# Ex - Context Diagram

{.instructions

Prepare a context diagram to define the design boundary for your project.

Here is a PlantUML/C4 example to get started.

![Example Context Diagram](./examples/context.puml)

Make sure to include all possible user personas and external dependencies you may need.

Pass: 1 User and 1 Dependency

Good: >1 User and >1 Dependency

Exceed: >1 User and >1 Dependency, with both incoming and outgoing dependencies

}

![Fruitdash Context Diagram](./examples/context_fd.puml)


# Ex - Component Model: Top-Down

{.instructions

Within the context of your project domain, represent a model of your modular software architecture decomposed into components.

The number of components in your logical view should be between 6 and 9:

- At least one component should be further decomposed into sub components
- At least one component should already exist. You should plan how to reuse it, by locating it in some software repository and including in your model the exact link to its specification and its price.
- At least one component should be stateful.

The logical view should represent provide/require dependencies that are consistent with the interactions represented in the process view.

The process view should illustrate how the proposed decomposition is used to satisfy the main use case given by your domain model.

You can add additional process views showing how other use cases can be satisfied by the same set of components.

This assignment will focus on modularity-related decisions, we will worry about deployment and the container view later.

Here is a PlantUML example logical view and process view.

```puml
@startuml
skinparam componentStyle rectangle

!include <tupadr3/font-awesome/database>

title Example Logical View
interface " " as MPI
interface " " as SRI
interface " " as CDI
interface " " as PSI
[Customer Database <$database{scale=0.33}>] as CDB 
[Music Player] as MP
[User Interface] as UI
[Payment Service] as PS
[Songs Repository] as SR
MP - MPI
CDI - CDB
SRI -- SR
PSI -- PS
MPI )- UI
UI --( SRI
UI -( CDI
MP --( SRI
CDB --( PSI


skinparam monochrome true
skinparam shadowing false
skinparam defaultFontName Courier
@enduml
```

```puml
@startuml
title Example Process View

participant "User Interface" as UI
participant "Music Player" as MP
participant "Songs Repository" as SR
participant "Customer Database" as CDB
participant "Payment Service" as PS

UI -> SR: Browse Songs
UI -> CDB: Buy Song
CDB -> PS: Charge Customer
UI -> MP: Play Song
MP -> SR: Get Music

skinparam monochrome true
skinparam shadowing false
skinparam defaultFontName Courier
@enduml
```

Hint: How to connect sub-components to other external components? Use this pattern.

```puml
@startuml
component C {
   component S
   component S2
   S -(0- S2
}
interface I
S - I

component C2
I )- C2

skinparam monochrome true
skinparam shadowing false
skinparam defaultFontName Courier
@enduml
```

Pass: 6 components (1 decomposed), 1 use case/process view

Good: 6 components (1 decomposed), 2 use case/process view

Exceed: >6 components (>1 decomposed) and >2 use case/process view

}

## Logical View

![FruitDash - Logical View](./examples/logical_view_top_down.puml)

<!-- {.feedback

Check and correct the dependencies. X )- Y indicates that Y requires what X provides. If X )- Y in the logical view, the process view should consistently show that Y -> X, Y calls X and not the other way around.

Also each component should have a distinct interface.

} -->

## Process Views

First Use Case: 

![FruitDash - Process View 1](./examples/td_process_view_use_case_1.puml)

Second Use Case: 

![FruitDash - Process View 2](./examples/td_process_view_use_case_2.puml)

Third Use Case: 

![FruitDash - Process View 3](./examples/td_process_view_use_case_3.puml)


# Ex - Component Model: Bottom-Up

{.instructions

Within the context of your project domain, represent a model of your modular software architecture decomposed into components.

To design this model you should attempt to buy and reuse as many components as possible.

In addition to the logical and process views, you should give a precise list to all sources and prices of the components you have selected to be reused.

Write an ADR to document your component selection process (indicating which alternatives were considered).

Pass: Existing design with at least 1 reused components (1 Logical View, 1 Process View)

Good: Existing design with at least 3 reused components (1 Logical View, 1 Process View, 1 ADR)

Exceed: Redesign based on >3 reused components (1 Logical View, >1 Process View, >1 ADR)

}

## Reused Components List

* [SQL Server Standard](https://www.microsoft.com/it-it/sql-server/sql-server-downloads)
* [Power BI](https://powerbi.microsoft.com/it-ch/)
<!-- * [Power BI - In-app Excel Analyzer](https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-analyze-in-excel) -->
* [Power BI - Excel data extractor](https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-connect-power-bi-datasets-excel)
* [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/#features)
* [ASP.NET - Web API](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-6.0&tabs=visual-studio)

## Logical View

![FruitDash - Logical View](./examples/logical_view_bottom_up.puml)

## Process Views

First Use Case: 

![FruitDash - Process View 1](./examples/bu_process_view_use_case_1.puml)

Second Use Case: 

![FruitDash - Process View 2](./examples/bu_process_view_use_case_2.puml)

## ADR

### ADR #1

### 1. What did you decide?
<!-- Give a short title of solved problem and solution -->
I decided to adopt Azure Active Directory as a solution for the identity service.

### 2. What was the context for your decision?
<!-- What is the goal you are trying to achieve? -->
<!-- What are the constraints? -->
<!-- What is the scope of your decision? Does it affect the entire architecture? -->
In the context of my application, I need a service that is capable of handling basic authentication and authorization
features, but that is also supporting advanced features such as 2FA. 

### 3. What is the problem you are trying to solve?
<!-- You may want to articulate the problem in form of a question. -->
Keep the data protected and not accessible from users that do not have the authorization to see them.

### 4. Which alternative options did you consider?
<!-- List at least 3 options -->
1. Identity framework supported by the ASP.NET Framework
2. Power BI - Microsoft Account
3. Azure Active Directory

### 5. Which one did you choose?
<!-- Pick one of the options as the outcome of your decision -->
I decided to go with the third option: Azure Active Directory.

### 6. What is the main reason for that?
<!-- List the positive consequences (pros) of your decision: -->
<!-- quality improvement, satisfaction of external constraint. If any, list the negative consequences (cons), quality degradation -->
The main reason for my choice is that the identity is a critical component of the whole architecture. Giving support 
through a framework might introduce bugs in the application that can be difficult to handle. Hence, the first option
is excluded. The second option initially was my first choice, but there is drawback: it cannot be integrated with a
SQL Server solution to check that the user has the proper authentication grants to visualize the data. 
Finally, Azure Active Directory can be integrated in all the components that I picked, and it is therefore the solution I decided to opt for.

### ADR #2

### 1. What did you decide?
<!-- Give a short title of solved problem and solution -->
To adopt Power BI as the development tool to set up the company's data dashboard

### 2. What was the context for your decision?
<!-- What is the goal you are trying to achieve? -->
<!-- What are the constraints? -->
<!-- What is the scope of your decision? Does it affect the entire architecture? -->
We need to decide whether to adopt a third-party application or to build one from scratch. The factors involved in this decision are mainly to keep data consistent across users, make sure that multiple users can access the product concurrently as well as to provide simple yet captivating visualization. To consider is also that the data of the client is already stored in a Microsoft SQL Server database. This decision deeply influences the choices on the expertise needed to develop the project as well as the technology to adopt.

### 3. What is the problem you are trying to solve?
<!-- You may want to articulate the problem in form of a question. -->
Making sure that the application has a great and consistent UI without compromising the security and scalability 
features that the client request

### 4. Which alternative options did you consider?
<!-- List at least 3 options -->
1. Using a web development frameworks: Angular or React
3. Using a Microsft Office Adds-in for Excel
3. Using a third-party software: Microsoft Power BI

### 5. Which one did you choose?
<!-- Pick one of the options as the outcome of your decision -->
I decided to go with the last option and develop the application using the Microsoft Power BI platform.

### 6. What is the main reason for that?
<!-- List the positive consequences (pros) of your decision: -->
<!-- quality improvement, satisfaction of external constraint. If any, list the negative consequences (cons), quality degradation -->
Microsoft Power BI provides a friendly and easy-to-use environment to create modern dashboards. This tool provides a connector to extract data from Microsoft SQL database and it can be easily integrated with Azure Active Directory module to grant security features. Moreover, as the data stored has a low disk footprint and the tool subscription is free up to 1GB of data loaded per user, it might also grant lower costs of development and maintenance. 

# Ex - Interface/API Specification

{.instructions

In this iteration, we will detail your previous model to specify the provided interface of all components based on their interactions found in your existing process views.

1. choose whether to use the top down or bottom up model. If you specify the interfaces of the bottom up model, your interface descriptions should match what the components you reuse already offer.

2. decide which interface elements are operations, properties, or events.

Get started with one of these PlantUML templates, or you can come up with your own notation to describe the interfaces, as long as it includes all the necessary details.

The first template describes separately the provided/required interfaces of each component. 

![Separate Required/Provided Interfaces](./examples/interface1.puml)

The second template annotates the logical view with the interface descriptions: less redundant, but needs the logical dependencies to be modeled to show which are the required interfaces.

![Shared Interfaces](./examples/interface2.puml)

Pass: define interfaces of all outer-level components

Good: Define interfaces of all outer-level components. Does your architecture publish a Web API? If not, extend it so that it does. 

Exceed: Also, document the Web API using the OpenAPI language. You can use the [OpenAPI-to-Tree](http://api-ace.inf.usi.ch/openapi-to-tree/) tool to visualize the structure of your OpenAPI description.

}

### Interface API Specification

![FruitDash - Interface API/Specification](./examples/td_fruitdash_interface.puml)

{.feedback

What kind of event is `onRefreshUpdateGraphs()` - what provokes it?

Which component of your architecture implements the Web API?

}

### OpenAPI Specification

![FruitDash - OpenAPI Specifications](../../../src/sa/model/assets/openapi-fruitdash-tree.png)


# Ex - Connector View

{.instructions

Extend your existing models introducing the connector view

For every pair of connected components (logical view), pick the most suitable connector. Existing components can play the role of connector, or new connectors may need to be introduced.

Make sure that the interactions shown in the process views reflect the primitives of the selected connector

Pass: model existing connectors based on previous model decisions

Good: model existing connectors based on previous model decisions, write an ADR about the choice of one connector

Exceed: introduce a new type of connector and update your existing process view 
(sequence diagram) to show the connector primitives in action

}

<!-- ![Example Connector View Diagram](./examples/connector-view.c5) -->

<!-- Connector 1 -->
## Connector View Diagram
![Connector View Diagram](./examples/fruitdash-connector-view.c5)

<!-- Connector 2 -->
## ADR Connector

### 1. What did you decide?
<!-- Give a short title of solved problem and solution -->
I decided to introduce a tuple space to handle the interface between the dashboard, the graph and the data extractor components

### 2. What was the context for your decision?
<!-- What is the goal you are trying to achieve? -->
<!-- What are the constraints? -->
<!-- What is the scope of your decision? Does it affect the entire architecture? -->
The goal of my decision is to be able to render graphs on the UI (dashboard) in a simple and efficient manner,
without having to extract data from the SQL database every time a new graph needs to be rendered. Imagine the 
user would like to display a graph that has been already rendered previously. I would like to retrieve the 
data from a temporary storage to avoid the render component to wait for the data extraction before rendering the graph. This would also allow to simplify the data extraction, as when the user issues a request to save
data, the data can be extracted directly from the tuple space.

### 3. What is the problem you are trying to solve?
<!-- You may want to articulate the problem in form of a question. -->
Making sure that the user does not have to wait long for graphs to render when the data is already available.

### 4. Which alternative options did you consider?
<!-- List at least 3 options -->
1. Using a web API to connect the components
3. Using an RPC procedule call to connect the components
3. Using a tuple space to connect the components

### 5. Which one did you choose?
<!-- Pick one of the options as the outcome of your decision -->
I decided to go with the last option and introduce a tuple space to handle the interface between the dashboard, the graph and the data extractor components.

### 6. What is the main reason for that?
<!-- List the positive consequences (pros) of your decision: -->
<!-- quality improvement, satisfaction of external constraint. If any, list the negative consequences (cons), quality degradation -->
The main reason is that the option I went for improves the experience of the user as the graphs are rendered without having to wait for the data extraction from the database through the API. The user should experience
an improvement of the overall experience of using the application.

<!-- Connector 3 -->
## Process View Diagram
![Process View Diagram update](./examples/fruitdash-pw-update.puml)

# Ex - Adapters and Coupling

{.instructions

1. Highlight the connectors (or components) in your existing bottom-up design playing the role of adapter. (We suggest to use the bottom-up design since when dealing with externally sourced components, their interfaces can be a source of mismatches).
2. Which kind of mismatch** are they solving?
3. Introduce a wrapper in your architecture to hide one of the previously highlighted adapters
4. Where would standard interfaces play a role in your architecture? Which standards could be relevant in your domain?
5. Explain how one or more pairs of components are coupled according to different coupling facets
6. Provide more details on how each adapter solves the mismatches identified using pseudo-code or the actual code
7. How can you improve your architectural model to minimize coupling between components? (Include a revised logical/connector view with your solution)

Pass: 1-5 (with one adapter)

Good: 1-6 (with at least two adapters)

Exceed: 1-7 (with at least two adapters)

** If you do not find any mismatch in your existing design we suggest to introduce one artificially.

## Hints

* (1) Should we find cases where two components cannot communicate (and are doing it wrongly) and highlight they would need an adapter?, or cases where we have already a "component playing the role of adapter in the view" and highlight only the adapter?

  *Both are fine. We assumed that if you draw a dependency (or a connector) the interfaces match, but if you detect that the components that should communicate cannot communicate then of course introduce an adapter to solve the mismatch*

* (2) Please show the details about the two interfaces which do not match (e.g., names of parameters, object structures) so that it becomes clear why an adapter is needed and what the adapter should do to bridge the mismatch

* (5-6) These questions are about the implications on coupling based on the decisions you documented in the connector view.
Whenever you have a connector you couple together the components and different connectors will have different forms of coupling

  For example, if you use calls everywhere, do you really need them everywhere? is there some pair of components where you could use a message queue instead?

  Regarding the coupling facets mentioned in question 5. You do not have to answer all questions related to "discovery", "session", "binding", "interaction", "timing", "interface" and "platform" (p.441, Coupling Facets). Just the ones that you think are relevant for your design and by answering them you can get ideas on how to do question 6.

}

## Adapters 

### 11.1

![FruitDash - Logical View - Adapters](./examples/lw_bottom_up_adapters.puml)

### 11.2 - Adapters

<!-- First adapter -->
To accomplish the task for this assignment, I substituted the PowerBI integrated graph extractor component
with a personalized graph extractor that achieve the same result, but is built outside the PowerBI world 
and therefore, it would need an adapter to make sure that these two can talk to each other.
The Graph Adapter API is designed for this purpose and it serves the client with a service to extract 
the graph data from the PowerBI interface.

<!-- Second adapter -->
The second adapter is a component that plays the role of an adapter in the view. Its role is to transform the
operational (day-to-day transactions) database into data that can be analyzed and displayed quickly and that
it can be stored in an analytical database (such as Cassandra, MongoDB, etc...).

### 11.3 - Wrapper

Not provided in this case as no suitable wrappers were identified
<!-- ![FruitDash - Logical View - Wrapper](./examples/lw_bottom_up_wrappers.puml) -->

<!-- Wrapper to be added -->

### 11.4 - Standard Interfaces
The bottom-up architecture diagram displays components that already expose standard interfaces to be able to communicate with each other components. The communication is mainly implemented through REST APIs interfaces between components by exchanging 
information in JSON format. The Data Extractor and Graph Extractor in reality are components that are integrated within
the PowerBI solution, which ultimately exposes APIs interfaces to the outside world to be able to call these operations
even from other components. 

### 11.5 - Coupling Facets
First of all, a timing facet is present between the Dashboard and the Graph Extractor components, as the extractor 
waits for the synchronous call from the dashboard to return the graph data once the user triggers the action to extract
the figure from the UI. 

Second, we face a binding facet because of the relationships established with the vendors of PowerBI and Azure Active Directory. If the price of these services increases, the cost of the solution will increase and consequently, the business
should take into consideration the possibility of switching to a different vendor solution. For instance, PowerBI is cheap
for low data loading solutions (as in our case), but starts to become increasingly expensive as soon as the data scales.

Thirdly, a platform independence facet is present between the Identity Service (implemented through means of the Azure Active Directory) and the other services that requires authentication. Switching to other authentication services might require
a change in the architecture that the client could notice (e.g., using Google Authentication services, the client would need
to register and log-in with a different account).

Finally, the presence of a discovery facet between PowerBI (front-end) and the Data API service (back-end), which requires
an address to be provided to the client to fetch data from the API. The API server is unique and receives a static IP address,
which would allow PowerBI to calls the API with the same address for each possible call.

### 11.6 - Pseudo-code or Codes

Graph Adapter API
```
function upload_graph_image(dashboard_id, graph_id)
    user = getCurrentActiveUser(dashboard_id)
    user_auth = getUserAuth(user)
    if user_auth {
      graph_image = getGraphFromPowerBI(user, dashboard_id, graph_id)
      return graph_data
    }
    else {
      throw an exception for the "user not authorized"
    }
```

Transformer Adapter API
```
function query_data(sql_query) {
    return query(sql_query)
}

function pre_process_data(sql_query)
    data = query_data(sql_query)
    data_no_empties = dropEmptyEntries(data)
    data_cleaned_boundaries = checkExpectedBoundaries(data)
    data_columnar_metadata = addMetadataInfo(data_cleaned_boundaries)
    data_columnar_type_fields = convertToCorrectTypeField(data_columnar_metadata)
    return data_columnar_type_fields

// ingestion ...
```

### 11.7
In my opinion the coupling among my components is already minimized and I do not see any improvements to be made. There is a strong relationship
binding with the vendors of PowerBI and Azure Active Directory, but any other vendor solution would introduce the same problem. 



# Ex - Physical and Deployment Views

{.instructions

a. Extend your architectural model with the following viewpoints:

1. Physical or Container View

2. Deployment View

Your model should be non-trivial: include more than one physical device/virtual container (or both). Be ready to discuss which connectors are found at the device/container boundaries.

b. Write an ADR about which deployment strategy you plan to adopt. The alternatives to be considered are: big bang, blue/green, shadow, pilot, gradual phase-in, canary, A/B testing.

c. (Optional) Prepare a demo of a basic continuous integration and delivery pipeline for your architectural documentation so that you can obtain a single, integrated PDF with all the viewpoints you have modeled so far. 

For example:

- configure a GitHub webhook to be called whenever you push changes to your documentation
- setup a GitHub action (or similar) to build and publish your documentation on a website

Pass: 1 physical view, 1 deployment view, 1 ADR (b.)

Good: >1 physical view, >1 deployment view, 1 ADR (b.)

Exceed: 1 physical view, 1 deployment view, 1 ADR (b.) + 1 demo (c.)

}

### 1. Physical view
![FruitDash - Logical View - Adapters](./examples/physical_view.puml)

### 2. Deployment view
![FruitDash - Logical View - Adapters](./examples/deployment_view.puml)

### ADR (Deployment strategy)

### 1. What did you decide?
<!-- Give a short title of solved problem and solution -->
I decided to go only with a shadow strategy for the release and deployment activity of my dashboard solution.

### 2. What was the context for your decision?
<!-- What is the goal you are trying to achieve? -->
<!-- What are the constraints? -->
<!-- What is the scope of your decision? Does it affect the entire architecture? -->
The goal of this ADR is to find the optimal way to release / deploy my application.
In order to select the best strategy for this purpose, we need to consider the environment in which we are deploying our application. The scope of the dashboard is constrained within the company and therefore, it can only have a set of limited users that can access it.

### 3. What is the problem you are trying to solve?
<!-- You may want to articulate the problem in form of a question. -->
Make sure that the users are the least affected by my release strategy.

### 4. Which alternative options did you consider?
<!-- List at least 3 options -->
1. Big-bang and Blue/Green deployment strategies alternatives
3. Pilot deployment strategy
3. Shadow deployment strategy

### 5. Which one did you choose?
<!-- Pick one of the options as the outcome of your decision -->
I decided to go for the shadow deployment strategy.

### 6. What is the main reason for that?
<!-- List the positive consequences (pros) of your decision: -->
<!-- quality improvement, satisfaction of external constraint. If any, list the negative consequences (cons), quality degradation -->
The main reason I decided to go with this option is that I would like to create the 
least friction for the users, who will always use the latest available version of the dashboard as it is deployed as a SaaS solution. Hence, I do not want to consider
strategies that would roll out the software on a rolling basis which would exclude part of the users from using the latests feature available. Using a shadow release strategy, I would be able to deploy the dashboard on a rolling basis and keep all the users updated with the latest features. 


### Continuous Development and Continuous Integration (CD/CI) Demo

```
DONE
```


# Ex - Availability and Services

{.instructions 

The goal of this week is to plan how to deliver your software as a service with high availability.

1. If necessary, change your deployment design so that your software is hosted on a server (which could be running as a Cloud VM). Your SaaS architecture should show how your SaaS can be remotely accessed from a client such as a Web browser, or a mobile app
2. Sketch your software as a service pricing model (optional)
3. How would you define the availability requirements in your project domain? For example, what would be your expectation for the duration of planned/unplanned downtimes or the longest response time tolerated by your clients?
4. Which strategy do you adopt to monitor your service's availability? Extend your architecture with a watchdog or a heartbeat monitor and motivate your choice with an ADR.
5. What happens when a stateless component goes down? model a sequence diagram to show what needs to happen to recover one of your critical stateless components
6. How do you plan to recover stateful components? write an ADR about your choice of replication strategy and whether you prefer consistency vs. availability. Also, consider whether event sourcing would help in your context.
7. How do you plan to avoid cascading failures? Be ready to discuss how the connectors (modeled in your connector view) impact the reliability of your architecture.
8. How did you mitigate the impact of your external dependencies being not available? (if applicable)

Pass: 1, 3, 4, one of:  5, 6, 7, 8

Good: 1, 2, 3, 4, two of:  5, 6, 7, 8

Exceed: 1, 2, 3, 4, 5, 6, 7, 8

}

## 1. Hosting the app on a server

This is already the case as PowerBI is a SaaS solution that is accessible either through a client, a web browser or a mobile app.

## 2. Pricing model 

I came up with two pricing models for my dashboard solution. 
1. A **monthly subscription model**: this option includes a monthly-based agreement to use the software, along with 24/7 technical support for a discounted fee that is agreed with the customer.
2. A **one-time purchase model**: this option includes a lifetime purchase of the software, but the technical support is provided when requested and is invoiced apart.

The client is free to make a choice between the two models.

## 3. Availability requirements
Availability of the implemented services should be obviously high. The users should always be able to access the dashboard. The external dependencies are granted to have a 99.9% availability from the respective cloud providers (for both PowerBI and Azure Active Directory services).

For what concern the internal infrastructure (mainly related to APIs and the databases), the planned downtime should occur during weekends and preferably on night shifts, as it would impact the least number of users (who would anyway be notified of such downtime). Such a downtime should take no more than a night shift and therefore, it should last approximately no more than 6 hours. Unplanned downtimes should be avoided as much as possible, but if occurring, the downtime should be equivalent to the time it takes to redeploy the containers that hosts each individual component (around 15-20 minutes).

The service response time should be as low as possible, as it mainly involves fetching the data from the database and serving the UI with graphical rendered data. This service is provided from PowerBI and it also scales to large amount of data to aggregate and display. Therefore, the maximum expected delay should be in order of seconds. 

<!-- TODO -->
## 4. Service availability monitoring

<!-- ![FruitDash - Deployment View - Heartbeat](./examples/13_deployment_view_heartbeat.puml) -->

![FruitDash - Deployment View - Watchdog](./examples/13_deployment_view_watchdog.puml)

```
Is the heartbeat deployed in an independent component or is it a heartbeat monitor?
```
### ADR (Availability strategy)

#### 1. What did you decide?
<!-- Give a short title of solved problem and solution -->
To introduce multiple watchdogs component to detect the availability of my services

#### 2. What was the context for your decision?
<!-- What is the goal you are trying to achieve? -->
<!-- What are the constraints? -->
<!-- What is the scope of your decision? Does it affect the entire architecture? -->
The goal to achieve is to detect whether the components are available or not. 

### 3. What is the problem you are trying to solve?
<!-- You may want to articulate the problem in form of a question. -->
Make sure that when a service goes down, my solution detects that in a cleaned and effective way.

### 4. Which alternative options did you consider?
<!-- List at least 3 options -->
1. Heartbeat
2. Watchdog
3. Heartbeat + Watchdog

### 5. Which one did you choose?
<!-- Pick one of the options as the outcome of your decision -->
I went for an hybrid approach: heartbeat and watchdog strategy.

### 6. What is the main reason for that?
<!-- List the positive consequences (pros) of your decision: -->
<!-- quality improvement, satisfaction of external constraint. If any, list the negative consequences (cons), quality degradation -->
A positive note for introducing an heartbeat component in the architecture is the possibility of registering multiple components to the same heartbeat monitoring service. The Data APIa and the Data Processor components that require failover monitoring, we can easily register them to the same heartbeat monitoring service and have one centralized monitoring system.  

The presence of external dependencies makes it such that we can only introduce watchdogs (active components) that call the services (passive) to
monitor their availability and react accordingly.




Note however that if we were to leverage the ability of PowerBI to connect directly to the SQL Server Database, we would effectively eliminate the API component, and therefore, a watchdog would probably be a better service to monitor the availability of our solution. Moreover, PowerBI provides services to alert the service failover, as well as to extend high-availability features to on-premises database solutions, as in our case.

For more info: https://docs.microsoft.com/en-us/data-integration/gateway/service-gateway-high-availability-clusters

## 5. Stateless component recovery
!["FruitDash - Process View - Stateless components"](./examples/13_process_view_stateless.puml)
```
Is the second tick placed in the correct column?
```
## 6. Stateful component recovery

Event sourcing would be helpful in a scenario in which the data processing service goes down. How do we get the state of the analytical database if the service went down while it was executing a batch load operation? We could log all the events that happened during the batch ingestion to understand at which point the process was interrupted and restore the operation from that point. 

In our use case, consistency prevails over availability as we want to be strict on having data that is up-to-date to ensure the correctness of the information displayed on the dashboard.

#### 1. What did you decide?
<!-- Give a short title of solved problem and solution -->
I decided to leverage the synchronous replication strategy

#### 2. What was the context for your decision?
<!-- What is the goal you are trying to achieve? -->
<!-- What are the constraints? -->
<!-- What is the scope of your decision? Does it affect the entire architecture? -->
The goal of this decision is to allow strong consistency when node outages occur.

### 3. What is the problem you are trying to solve?
<!-- You may want to articulate the problem in form of a question. -->
Make sure that when an outage occur, the information that are displayed on the dashboard are accurate.

### 4. Which alternative options did you consider?
<!-- List at least 3 options -->
1. Synchronous replication strategy
2. Asynchronous replication strategy
3. No replication strategy

### 5. Which one did you choose?
<!-- Pick one of the options as the outcome of your decision -->
The synchronous replication strategy was chosen.

### 6. What is the main reason for that?
<!-- List the positive consequences (pros) of your decision: -->
<!-- quality improvement, satisfaction of external constraint. If any, list the negative consequences (cons), quality degradation -->
The only components that perform write operation in my case is the data processor. As the goal of my application is to display data and speed up the analytical process within the company, the data that is displayed must be accurate. Therefore, the synchronous replication strategy is the one that suits best, as it allows us to have the most up-to-date data.

On the other hand, the synchronous strategy might take time for replicas to be coordinated and therefore, it might
slow down the process of extracting, transforming and loading data into the analytical database.

## 7. Avoid cascading failures
To ensure that cascading failures are prevented, we want to introduce circuit breaker strategy that works syhnchronously with the heartbeat monitoring service to keep track of which service goes down. This prevents the other services from being affected by the failure of the one that is down.

A place where such component could make sense is between the identity service and all components that call this service (dashboard and the API). In case of a failover occurs, the circuit breaker is now aware of that and, for all the subsequent calls until the service is back up, it could redirect the calls to a local cache to retrieve authentications and authorizations information.

## 8. Mitigation of external dependencies

The external dependencies that the solution provided makes use of are the PowerBI and Azure Active Directory services.
Given that, there are multiple ways in which we can mitigate the impact of the external dependencies:

1. For what concern the identity module, we could cache the history of the authorized and authenticated users
locally so that, in case the service goes down, we can still allow (at least) the users that have already been authenticated to access the dashboard. This solution however might incur the risk of authenticating a user 
that is not in the company anymore and it should therefore kept updated.

2. For what concern the dashboard, we could deploy an on-premise version of the PowerBI application on the users' desktops and make sure that the application is always updated with the latest version. 

# Ex - Scalability

{.instructions 

Now that your architecture delivers your software as a service, let's redesign it so that it can scale!

1. Pick one scalability dimension: number of clients, size of input, size of state, number of dependencies

2. How well does your architecture scale along the chosen dimension? Where do you expect the bottleneck to be?

3. Modify your architecture to remove the scalability bottleneck you have identified (show both logical, process and deployment view) - consider whether the API/interface of the bottleneck component should be improved.

4. Write an ADR regarding the scalability pattern you have introduced.

5. Write an ADR regarding the issue of component discovery, choosing one of the alternatives: dependency injection vs. directory. Can you identify an existing component playing the role of directory/dependency injection container? Could you give an example of where you would need to add such component to facilitate dynamic component discovery?

Pass: 1, 2, 3, 5

Good: 1, 2, 3, 4, 5

Exceed: 1, 2, 3, 4, 5 then redo 1, 2, 3 for different scalability dimensions

}

# Ex - Flexibility

{.instructions 

Only dead software stops changing. You just received a message from your customer, they have an idea. Is your architecture ready for it?

1. Pick a new use case scenario. Precisely, what exactly do you need to change of your existing architecture so that it can be supported? Model the updated logical/process/deployment views.

2. Pick another use case scenario so that it can be supported without any major architectural change (i.e., while you cannot add new components, it is possible to extend the interface of existing ones or introduce new dependencies). Illustrate with a process view, how your previous design can satisfy the new requirement.

3. Change impact. One of your externally sourced component/Web service API has announced it will introduce a breaking change. What is the impact of such change? How can you control and limit the impact of such change? Update your logical view

4. Open up your architecture so that it can be extended with plugins by its end-users. Where would be a good extension point? Update your logical view and give at least one example of what a plugin would actually do.

5. Assuming you have a centralized deployment with all stateful components storing their state in the same database, propose a strategy to split the monolith into at least two different microservices. Model the new logical/deployment view as well as the interfaces of each microservice you introduce.

Pass: 1, one out of 2-5.

Good: 1, two out of 2-5.

Exceed: 1-5.

}