---
parent: About
title: Coding Design
nav_order: 4
---

# Coding Design

## Front End

The front end will use [React](https://reactjs.org/) due to it's maturity and avilability of resources.

#### Coding Style

All front end code will follow the coding standard [here](https://docs.google.com/document/d/1qpdtyZcg5OTvGONVy0asJeFdyNPYCMJbIauFufSrvug/edit?usp=sharing).

## Back End

The back end of the application will use [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/). These will communicate with an associated [MongoDB](https://www.mongodb.com/) database for data storage.

#### Coding Style

All backend code will follow the [JavaScript Semistandard](https://github.com/standard/semistandard) coding style.

## Branching

The GitHub branching strategy will utilise many small, short-lived branches. These branches will implement a small feature which should be merged back into the main branch promptly.

## API

A [REST](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design) API will be developed to allow the front end to interact with the backend.

## Testing

Testing is performed on a per-developer basis in the form of debugging and functionality testing of the application.
For example, [Postman](https://www.postman.com/) is used to test the backend api:

![Example Postman Testing](../assets/images/Example%20Postman%20Testing.png)

## Deployment

The application will be deployed to [Heroku](https://www.heroku.com/) through a GitHub Actions pipeline.
