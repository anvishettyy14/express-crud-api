# Express CRUD API

A backend API built using Node.js, Express.js, and SQLite.

## Features

* Get all posts
* Get post by ID
* Create new post
* Update post
* Delete post
* Submission validation middleware
* Pending verification workflow
* User reputation system
* SQLite database integration

## Technologies Used

* Node.js
* Express.js
* SQLite3
* Git & GitHub

## API Endpoints

### Posts

* GET /posts
* GET /posts/:id
* POST /posts
* PUT /posts/:id
* DELETE /posts/:id

### Verification

* PUT /posts/:id/verify

Verifies a post and changes its status from "pending verification" to "verified".

### Reputation

* GET /users/:id/reputation

Calculates and returns:

* Contributor Score
* Curator Score

## Submission Protocol

When a new post is submitted:

1. The request is validated.
2. A title is required.
3. The post is assigned the status:

   * pending verification
4. Verified posts can later be approved through the verification endpoint.

## Database

SQLite is used as the relational database for storing project data.

## Author

Anvi Shetty
