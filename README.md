# Estimation Tool Backend

This is the NestJS backend for the Estimation Tool application. It serves static questions data and accepts user submissions to calculate a project budget based on an hourly rate and user-selected answers. Each answer contributes 1 hour for design and 1 hour for development.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Dockerization (Optional)](#dockerization-optional)
- [License](#license)

## Overview

This backend provides two main endpoints:

- **Questions Endpoint:** Returns a static set of questions loaded from a JSON file.
- **Submissions Endpoint:** Accepts estimation submissions, computes the total hours and budget (based on an hourly rate and the number of answers provided), and persists the data in an SQLite database.

## Features

- Serves questions data from the backend.
- Accepts estimation submissions via a POST request.
- Calculates hours as follows:
  - **Designer Hours:** 1 hour per answer.
  - **Developer Hours:** 1 hour per answer.
  - **Total Hours:** Sum of designer and developer hours.
  - **Budget:** `hourlyRate * totalHours`
- Persists submission data using TypeORM with SQLite.
- Provides endpoints to retrieve submissions.
- End-to-end tests using Pactum.

## Tech Stack

- **NestJS** as the framework.
- **TypeORM** for ORM.
- **SQLite** as the database (development mode).
- **Pactum** for end-to-end testing.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the backend directory:**

   ```bash
   cd estimation-tool/backend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Install SQLite dependency:**

   ```bash
   npm install sqlite3 --save
   ```

## Configuration

- The backend uses TypeORM with SQLite. By default, it will create/use a file named `db.sqlite` in the project root.
- Create a `.env` file for any environment-specific settings if needed.

## Running the Application

- **Development mode (with hot-reloading):**

  ```bash
  npm run start:dev
  ```

- **Production mode:**

  ```bash
  npm run build
  npm run start:prod
  ```

## API Endpoints

### GET /questions/all

Returns the questions data.  
**Example Response:**

```json
[
  {
    "title": "Design and Development Essentials",
    "questions": [
      { "step": 1, "category": "App size", "question": "How big is your app?", "ChildrenType": "ChoiceHorizontal", "children": [ ... ] },
      ...
    ]
  },
  {
    "title": "Content and Interaction",
    "questions": [ ... ]
  },
  {
    "title": "Management and Analytics",
    "questions": [ ... ]
  }
]
```

### POST /submissions

Accepts an estimation submission.  
**Request Body:**

```json
{
  "hourlyRate": 30,
  "answers": {
    "UI Level": ["Polished"],
    "App size": ["Medium"]
  }
}
```

The backend calculates:
- **Designer Hours:** number of answers (e.g., 2)
- **Developer Hours:** same as designer hours (e.g., 2)
- **Total Hours:** designer + developer (e.g., 4)
- **Budget:** hourlyRate * totalHours (e.g., 30 * 4 = 120)

**Example Response:**

```json
{
  "id": 1,
  "hourlyRate": 30,
  "designerHours": 2,
  "developerHours": 2,
  "totalHours": 4,
  "budget": 120,
  "createdAt": "2025-03-02T18:46:XX.XXXZ",
  "answers": {
    "UI Level": ["Polished"],
    "App size": ["Medium"]
  }
}
```

### GET /submissions/:id

Returns the submission data for the given ID.

## Testing

End-to-end tests are implemented using Pactum.

Run the tests with:

```bash
npm run test:e2e
```

Ensure that your NestJS application isn’t running when you run these tests, as the tests will spin up their own instance.

## Dockerization (Optional)

You can dockerize this backend for consistent environments. Below is an example Dockerfile:

```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run your app
CMD ["node", "dist/main.js"]
```

**Build and run:**

```bash
docker build -t estimation-backend .
docker run -p 4000:4000 estimation-backend
```

## License

This project is licensed under the MIT License.

