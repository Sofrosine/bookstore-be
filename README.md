To create API documentation for your routes, you can use Markdown syntax in your `README.md` file. Here's how you can document each route based on the provided route definitions:

# API Documentation

## Auth Routes

### Register User
- **Method:** POST
- **Endpoint:** /register
- **Description:** Register a new user.
- **Request Body:** 
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** 
  - Status: 201 Created
  - Body: The newly created user object
  
### Login User
- **Method:** POST
- **Endpoint:** /login
- **Description:** Log in an existing user.
- **Request Body:** 
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** 
  - Status: 200 OK
  - Body: A JSON Web Token (JWT) for authentication

## Book Routes

### List Books
- **Method:** GET
- **Endpoint:** /books
- **Description:** Get a list of books.
- **Authorization:** Bearer token required
- **Response:** 
  - Status: 200 OK
  - Body: Array of book objects
  
### Create Book
- **Method:** POST
- **Endpoint:** /books
- **Description:** Create a new book.
- **Authorization:** Bearer token required
- **Request Body:** 
  ```json
  {
    "title": "string",
    "writer": "string",
    "point": "string",
    "tags": "string[]"
  }
  ```
- **Response:** 
  - Status: 201 Created
  - Body: The newly created book object

## Order Routes

### List Orders
- **Method:** GET
- **Endpoint:** /orders
- **Description:** Get a list of orders.
- **Authorization:** Bearer token required
- **Response:** 
  - Status: 200 OK
  - Body: Array of order objects
  
### Create Order
- **Method:** POST
- **Endpoint:** /orders
- **Description:** Create a new order.
- **Authorization:** Bearer token required
- **Request Body:** 
  ```json
  {
    "book_id": "string",
  }
  ```
- **Response:** 
  - Status: 201 Created
  - Body: The newly created order object
  
### Delete Order
- **Method:** DELETE
- **Endpoint:** /orders/:id
- **Description:** Delete an order by ID.
- **Authorization:** Bearer token required
- **Response:** 
  - Status: 204 No Content

## User Routes

### List Users
- **Method:** GET
- **Endpoint:** /users
- **Description:** Get a list of users.
- **Authorization:** Bearer token required
- **Response:** 
  - Status: 200 OK
  - Body: Array of user objects
  
### Get Current User
- **Method:** GET
- **Endpoint:** /users/me
- **Description:** Get the details of the currently authenticated user.
- **Authorization:** Bearer token required
- **Response:** 
  - Status: 200 OK
  - Body: The user object of the authenticated user
```

You can copy and paste this documentation into your `README.md` file and adjust it as needed to fit your project's requirements. Make sure to replace placeholder values with actual descriptions of your endpoints and request/response bodies.