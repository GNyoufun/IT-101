---
parent: About
title: Project Details
nav_order: 1
---

# Project Details

## Quick Links

[Repository](https://github.com/GNyoufun/IT-101){: .btn .btn-purple .mr-2 } [Project Management](https://github.com/users/GNyoufun/projects/1){: .btn .btn-blue .mr-2 }

## What is this project?

This project is a simple web application, designed to keep track of many records personal to a user.
In particular, the application focuses on keep track of games a user owns, and many metrics relating to those games.

[Here](https://www.figma.com/file/SQu9N6EZBAvf6Bek3xuOiC/IT-101?node-id=0%3A1) is the UI design for the project.

## Project Design

![Dataflow diagram for the project](../assets/images/IT%20Project%20Diagrams.png)

## Database Connection Design

The System will use an Object Data Model (ODM) to connect to the MongoDB via the mongoose framework,

    An ODM represents the website's data as JavaScript objects, which are then mapped to the underlying database. According to developer.mozilla.org

The main method of connecting the database is established connect function provided by the mongoose, which connects the database with the specified URL provided by the MongoDB cluster. Where the URL is saved in the environment file that will not be accessible from the github for security.

The main interaction between the database and the JavaScript is using the mongoose framework functions. For example, insertMany(), DeleteMany(), find(), updateMany(), and findOneAndReplace().
And other self-defined functions that incorparated the functions provided by the framework.

## Database Design

The MongoDB database will consist of two collections, UserID and Review, where UserID stores the users that has/created an account in the system, and the Review stores the actual review of the raid that the user inputed.

The UserID and Review is modelled from users Schema and review Schema respectively. The detail field in the Schema is explained below.

There are two more Schema that is declared are GameTitle and gameID, which both are constructed to define the structure that users Schema and review Schema will embedded.

### Not Modelled Schema:

#### GameTitle Schema:

- GameTitle: Stores the game title (name) as a String
- GameType: Stores the type of the game (RPG, MOBA, etc) as a String

#### gameID Schema:

- GameID: Stores the in game ID of the team member as a String
- Level: Stores the level in game of the team member as a Number

### Modelled Schema:

#### users Schema:

- UserId: Stores the user id to identify the user, stored as a String
- Games: Stores a list of Games in the GameTitle Schema format

#### review Schema:

- Title: Stores the game title (name) as a String
- userId: Store the unique id of a user that listed in the UserID Collections(schema)
- Date: The Datetime of the current documents was stored
- Team: Stores a list of player in the game in the format of gameID Schema
- Durations: The time spend for the raid to completed, in minutes
- Result: An enum value (Win, Draw, Lost) that indicate the result of the raid
- comment: An general comments to the raid

## Epics

### Epic 1 - Frontend Design:

Designs and prototypes on the functionality and UI/UX of the web application.

### Epic 2 - Backend Design:

Designs and modelling on the functionality of the web server and database.

### Epic 3 - Backend Monitor Workflow:

Implementation of backend workflow and synergy with the frontend and database. 

### Epic 4 - Backend Functions:

Implementation of additional backend functionality.

### Epic 5 - Frontend Implementation:

Implementation of the UI designs in React.

### Epic 6 - Frontend and Backend Integration:

Link the frontend and backend together so both servers can work together.
