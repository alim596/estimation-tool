# Estimation Tool

This repository contains the full Estimation Tool application, which is split into two parts:

- **Backend:** A NestJS API that serves static questions data and accepts estimation submissions. It calculates a project budget based on an hourly rate and user-selected answers (each answer contributing 1 hour for design and 1 hour for development) and persists submissions in an SQLite database.
- **Frontend:** A Next.js application that interacts with the backend, displays questions, collects user input, and shows the estimated budget along with detailed hours breakdown.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (NestJS)](#backend-setup-nestjs)
  - [Frontend Setup (Next.js)](#frontend-setup-nextjs)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Dockerization (Optional)](#dockerization-optional)
- [License](#license)

## Overview

The Estimation Tool allows users to answer a series of questions regarding app design and functionality. Based on their responses and an hourly rate, the backend calculates:
- **Designer Hours:** 1 hour per answer.
- **Developer Hours:** 1 hour per answer.
- **Total Hours:** Sum of designer and developer hours.
- **Budget:** `hourlyRate * totalHours`

The backend serves the questions data and handles submissions, while the frontend renders the UI and interacts with the backend.

## Features

- **Questions Endpoint:** Returns static questions data (loaded from a JSON file).
- **Submissions Endpoint:** Accepts estimation submissions via a POST request, calculates hours and budget, and persists the data using TypeORM with SQLite.
- **Frontend Integration:** Next.js application to display questions, collect user answers, adjust hourly rate, and display detailed breakdown (designer hours, developer hours, total hours, and budget).
- **End-to-End Testing:** Using Pactum for backend endpoint tests.
- **Optional Dockerization:** For consistent development and production environments.

## Tech Stack

- **Backend:** NestJS, TypeORM, SQLite, Pactum (for testing)
- **Frontend:** Next.js, React
- **Other Tools:** Node.js, npm (or Yarn), Docker (optional)

## Installation

### Prerequisites

- **Node.js** (version 16 or later recommended)
- **npm** or **Yarn** package manager

_Note:_ You need to have both Next.js and NestJS installed for the frontend and backend respectively. The repository is set up as a monorepo (or multi-folder project) with separate folders for each.

### Backend Setup (NestJS)

1. **Navigate to the backend folder:**

   ```bash
   cd estimation-tool/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install the SQLite dependency:**

   ```bash
   npm install sqlite3 --save
   ```

4. **(Optional) Create a `.env` file** for environment-specific settings.

5. **Ensure your `.gitignore` in the backend is set up** to ignore build artifacts, `node_modules/`, and the SQLite database file (e.g., `db.sqlite`).

### Frontend Setup (Next.js)

1. **Navigate to the frontend folder:**

   ```bash
   cd estimation-tool/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure your frontend API endpoints** (in your `src/api.ts` or similar file) to point to the backend at the correct URL (e.g., `http://localhost:4000`).

4. **Ensure your `.gitignore` in the frontend** ignores `.next/`, `node_modules/`, and other build artifacts.

## Running the Application

### Backend

- **Development mode (with hot-reloading):**

  ```bash
  cd estimation-tool/backend
  npm run start:dev
  ```

- **Production mode:**

  ```bash
  cd estimation-tool/backend
  npm run build
  npm run start:prod
  ```

### Frontend

- **Development mode:**

  ```bash
  cd estimation-tool/frontend
  npm run dev
  ```

The frontend (Next.js) will typically run on port 3000, while the backend (NestJS) runs on port 4000. Make sure your API calls in the frontend are pointed to the correct backend URL.

## API Endpoints

### GET /questions/all

Returns the questions data from a static JSON file.

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
- **Designer Hours:** Number of answers (e.g., 2)
- **Developer Hours:** Same as designer hours (e.g., 2)
- **Total Hours:** Sum (e.g., 4)
- **Budget:** `hourlyRate * totalHours` (e.g., 30 * 4 = 120)

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

End-to-end tests are implemented using Pactum. To run the tests:

1. Make sure your NestJS application isn’t already running (the tests will spin up their own instance).
2. From the backend folder, run:

   ```bash
   npm run test:e2e
   ```

## Dockerization (Optional)

You can dockerize the backend and frontend for consistent environments.

### Example Dockerfile for the Backend

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

**Build and run the backend:**

```bash
docker build -t estimation-backend .
docker run -p 4000:4000 estimation-backend
```

*You can similarly create a Dockerfile for your Next.js frontend if desired.*

## License

This project is licensed under the MIT License.
