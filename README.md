# Course Management API

A RESTful API for managing educational content including courses and lessons. It features CRUD operations for courses and lessons, search functionality, Redis caching, and basic security measures.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
    - [Register](#register)
    - [Login](#login)
  - [Courses](#courses)
- [Security Considerations](#security-considerations)
- [Database](#database)
- [Challenges](#challenges)

## Setup Instructions

### Prerequisites

- Node.js (>=14.0.0)
- PostgreSQL (or a compatible database)
- Redis (for caching)
- Environment variables for configuration

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rjv450/task-course-management.git
   cd task-course-management

2. **Install Dependencies**

   ```bash
   npm install

3. **Configure Environment Variables**

   Create a .env file in the root directory of the project and add the following variables:
   
    DATABASE_URL=your_postgres_database_url
    REDIS_URL=your_redis_url
    JWT_SECRET=your_jwt_secret
    CORS_ORIGIN=your_cors_origin
    PORT=5000

4. **Run Migrations**
    Ensure you have Prisma CLI installed, then run:
   ```bash
   npx prisma migrate dev


5. **Start the Servers**

   ```bash
   npm run start


## API Documentation

### Authentication

### Register

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user.

**Request Body:**
``json
{
  "email": "user@example.com",
  "password": "securepassword"
}

**Response:**
201 Created:
{
  "id": 1,
  "email": "user@example.com",
  "password": "$2b$10$IBSAj01qN1j9I1bmSCPrjuMQv4Q16dU3kHdAaZUPaNzfB1ZOg0TUi",
  "createdAt": "2024-08-14T21:39:33.403Z",
  "updatedAt": "2024-08-14T21:39:33.403Z"
}
400 Bad Request: Validation errors or invalid data.
500 Internal Server Error: Error message.

### Login
**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate a user and return a JWT token.

**Request Body:**
``json
{
  "email": "user@example.com",
  "password": "securepassword"
}

**Response:**
200 OK: JWT token issued successfully.
400 Bad Request: Invalid credentials.
500 Internal Server Error: Error message.


### Courses

### Create a Course

**Endpoint:** `POST /api/courses`

**Description:** Create a new course.

**Request Body:**
``json
{
  "title": "Course Title",
  "description": "Course Description"
}

**Response:**
201 Created:
{
  "id": 7,
  "title": "Course Title",
  "description": "Course Description",
  "userId": 6,
  "createdAt": "2024-08-15T19:28:10.505Z",
  "updatedAt": "2024-08-15T19:28:10.505Z"
}
400 Bad Request: Validation errors or invalid data.
500 Internal Server Error: Error message.

### Get All Courses

**Endpoint:** `GET /api/course`

**Description:** Retrieve a list of courses. Supports pagination and search.

**Query Parameters:**
search: Keywords to search in course titles and descriptions.
page: Page number (for pagination).
limit: Number of items per page.

**Response:**
200 OK: List of courses.
500 Internal Server Error: Error message.

### Get a Course by ID

**Endpoint:** `GET /api/courses/:id`

**Description:** Retrieve a single course by ID, including lessons.

**Response:**
200 OK: The course details.
404 Not Found: Course not found.
500 Internal Server Error: Error message.

### Update a Course

**Endpoint:** `PUT /api/courses/:id`

**Description:** Update an existing course.

**Request Body:**
``json
{
  "title": "Updated Title",
  "description": "Updated Description"
}


**Response:**
200 OK: The updated course.
{
  "id": 3,
  "title": "Updated Title",
  "description": "Updated Description",
  "userId": 4,
  "createdAt": "2024-08-14T20:21:43.536Z",
  "updatedAt": "2024-08-15T19:29:20.940Z"
}
404 Not Found: Course not found.
500 Internal Server Error: Error message.

### Delete a Course

**Endpoint:** `DELETE /api/courses/:id`

**Description:** Delete a course and its associated lessons.

**Response:**
204 No Content: The course has been deleted.
404 Not Found: Course not found.
500 Internal Server Error: Error message.


### Create a Lesson

**Endpoint:** `POST /api/courses/:courseId/lessons`

**Description:** Create a new lesson.

**Request Body:**
``json
{
  "title": "Course Title",
  "content": "Course Description"
}

**Response:**
201 Created:
{
  "id": 4,
  "courseId": 3,
  "title": "Course Title",
  "content": "Course Description",
  "createdAt": "2024-08-15T19:30:15.381Z",
  "updatedAt": "2024-08-15T19:30:15.381Z"
}
400 Bad Request: Validation errors or invalid data.
500 Internal Server Error: Error message.

### Update a Lesson

**Endpoint:** `PUT /api/courses/:courseId/lessons/:id`

**Description:** Update an existing lesson.

**Request Body:**
``json
{
  "title": "Updated Title",
  "content": "Updated Description"
}


**Response:**
200 OK: The updated Lesspn.
{
  "id": 4,
  "courseId": 3,
  "title": "Updated Title",
  "content": "Updated Description",
  "createdAt": "2024-08-15T19:30:15.381Z",
  "updatedAt": "2024-08-15T19:31:12.765Z"
}
404 Not Found: Lesson not found.
500 Internal Server Error: Error message.

### Get a Lessons by Course ID

**Endpoint:** `GET/api/courses/:courseId/lessons`

**Description:** Retrieve all lessons associated with a specific course by its ID.

**Response:**
200 OK: A list of lessons associated with the specified course.
404 Not Found: Course not found.
500 Internal Server Error: Error message.

### Delete a Course

**Endpoint:** `DELETE /api/courses/:courseId/lessons/:id`

**Description:** Delete a course and its associated lessons.

**Response:**
204 No Content: The course has been deleted.
404 Not Found: Lesson not found.
500 Internal Server Error: Error message.

## Security Considerations

Input Validation: Ensure all inputs are validated to prevent SQL injection and other attacks.
XSS Protection: Use Helmet to set security headers and sanitize user input.
Rate Limiting: Protect your API from abuse using rate limiting.
Caching: Use Redis to cache frequently accessed data and reduce database load.
Error Handling: Ensure that errors are handled gracefully and do not expose sensitive information.


### Key Additions:
1. **Authentication**: Added sections for user registration and login.
2. **API Documentation**: Updated to include authentication endpoints.
3. **Security Considerations**: Included best practices for securing your API.


## Database
This API uses a PostgreSQL database to store and manage educational content, including courses and lessons. The database schema is defined using Prisma, an ORM for Node.js and TypeScript. Below is a summary of the database setup and schema.

**Schema**
The database schema is defined in the prisma/schema.prisma file. Here’s a summary of the models:

**User Model**
id: Integer, primary key, auto-increment
email: String, unique
password: String
createdAt: DateTime, default to now
updatedAt: DateTime, updated automatically
courses: Relation to the Course model

**Course Model**

id: Integer, primary key, auto-increment
title: String
description: String (optional)
userId: Integer, foreign key to User
user: Relation to the User model
lessons: Relation to the Lesson model
createdAt: DateTime, default to now
updatedAt: DateTime, updated automatically

**Lesson Model**

id: Integer, primary key, auto-increment
courseId: Integer, foreign key to Course
title: String
content: String (optional)
course: Relation to the Course model
createdAt: DateTime, default to now
updatedAt: DateTime, updated automatically


## Challenges 

The only issue I encountered was that I couldn't provide specific details about the search contents. So, I assumed it was similar to course management systems like Udemy or Coursera, and implemented the search functionality for courses using the getCourses API.

Feel free to contribute or report issues on the GitHub repository.