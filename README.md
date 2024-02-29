# Blog Management System with JWT Authentication

This project was node js with express,JWT,mongoose 

## Features
. User registration and authentication with JWT
. CRUD operations for blog posts
. Pagination and sorting for blog posts
. Middleware for JWT token verification

## Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed
npm (Node Package Manager) installed
MongoDB installed and running

## Usage
Start the server:Access the API at http://localhost:3000.

## Routes
Authentication Routes:

POST /auth/register: Register a new user.
POST /auth/login: Log in with a registered username and password.
Blog Post Routes:

GET /api/posts: Get a list of all blog posts (with pagination and sorting).
GET /api/posts/:id: Get details of a specific blog post by ID.
POST /api/posts: Create a new blog post (only accessible to authenticated users).
PUT /api/posts/:id: Update an existing blog post by ID (only accessible to the author).
DELETE /api/posts/:id: Delete a blog post by ID (only accessible to the author).

## JWT Authentication Flow
User registers by sending a POST request to /auth/register with a unique username, email, and password.
User logs in by sending a POST request to /auth/login with their registered username and password.
Upon successful login, the server generates a JWT token and returns it to the client.
The client includes this token in the Authorization header for subsequent requests to protected routes (/api/posts).
The server verifies the token on each request to ensure the user is authenticated and authorized.
