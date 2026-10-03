# E-Commerce Backend API

A RESTful E-Commerce Backend API built with **Node.js, Express.js and MongoDB**.

## Features

* User Registration & Login
* Bcrypt password hashing
* JWT Authentication
* Protected Profile API
* Product CRUD APIs
* Joi validation
* Multer image upload
* Cloudinary image storage
* Nodemailer email
* MongoDB with Mongoose
* Controllers, Services & Middleware
* Environment variables

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Joi
* Multer
* Cloudinary
* Nodemailer

## API Endpoints

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

POST, PUT and DELETE product APIs require JWT authentication.

## Image Upload

Product images are uploaded using:

```text
Multer → Temporary File → Cloudinary → MongoDB
```

The temporary file is removed after successful Cloudinary upload.

## Testing

All APIs were tested using **Postman**, including successful and invalid requests.

## Author

**Zain Ul Abdin**
