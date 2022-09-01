---
parent: API
title: REST Design
nav_order: 1
---
# Rest HTTP Design

## User Requests
| Resource | Post | Get |
| -------- | ---- | --- |
| /users   | Create a new user | Get all users (auth. required) |
| /users/{user_id} | NA | Get a user |
| /users/{user_id}/games | Add a game to a user | Get all games for a user |
| /users/{user_id}/games/{game_id} | NA | Get a game for a user |


### GET Requests

**GET "v1/users/{user_id}"**

Returns a .json with all relevant user information. Alternatively, returns a list of all users if user_id is not specified.

**GET "v1/users/{user_id}/games/{game_id}**

Returns a .json with all relevant game information of game_id for a particular user_id. If game_id is not specified, return a list of all games associated with user_id.

### POST Requests

**POST "v1/users/{user_id}"**

Creates a new user record for user_id, with attributes specified in the .json request body.
