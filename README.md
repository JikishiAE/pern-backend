# PERN Stack Application

This project is the backend web application built using the PERN stack: PostgreSQL, Express.js, React, and Node.js.

## Table of Contents

- [Basic Configuration](#basic-configuration)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Config.json Variables](#configjson-variables-sequelize)
- [Architecture](#architecture)
  - [Diagram](#diagram)

## Basic Configuration

This section outlines the steps required to set up and run the project.

### Prerequisites

Before you begin, ensure you have the following software installed:

*   **Node.js** (version 16.x or higher): [https://nodejs.org/](https://nodejs.org/)
*   **npm** (usually comes with Node.js)
*   **PostgreSQL** (version 14.x or higher): [https://www.postgresql.org/](https://www.postgresql.org/)
*   **Git**: [https://git-scm.com/](https://git-scm.com/)

### Installation

Follow these steps to install and run the project:

1.  **Clone the repository:**
    ```bash
    git clone [URL del repositorio]
    cd pern-backend
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ````

3.  **Configure the database:**
    *   Create a PostgreSQL database (e.g., `pern_app`, `vercel dbs`). You can use pgAdmin or the `psql` command-line tool.
    *   Navigate to the backend directory.
    *   Create the tables, you can use a tool like DBeaver or the `psql` command-line tool.

4.  **Set up environment variables:**
    *   Create a `.env` file in the `backend` directory. See the Environment Variables section for the required variables.

5. **Run the backend:**
    ```bash
    npm run dev
    ```
    *This will start the Express.js server in development mode and sync the database.*

6. **Seed the database:**
    ```bash
    npx sequelize-cli db:seed:all
    ```
    *This will seed the database with the data on ./seeders*

### Environment Variables

The project uses the following environment variables, which should be defined in the `.env` file in the `pern-backend` directory:

*   `POSTGRES_URL`: The connection string for your PostgreSQL database. Example: `postgresql://user:password@host:port/pern_app`
*   `PORT`: The port on which the Express.js server will run (default: 5000). Example: `5000`
*   `JWT_SEED`: Secret key for JWT token generation. Example: `your_secret_key`
*   `DB_NAME`: The database name. Example: `PernDb`
*   `DB_USER`: The database user. Example: `PernUser`
*   `DB_PASSWORD`: The database password. Example: `PernPa$$`
*   `DB_HOST`: The database host. Example: `5432`

**Example `.env` file:**

### Config.json Variables (Sequelize)

Sequelize uses the following environment variables, which should be defined in the `config/config.json` file in the `pern-backend` directory:

*   `database`: The database name. Example: `PernDb`
*   `username`: The database user. Example: `PernUser`
*   `password`: The database password. Example: `PernPa$$`
*   `host`: The database host. Example: `5432`


## Architecture

This section describes the project's architecture.

### Diagram

src/
├── application/          # Business logic
│   └── services/           
│       └── user.service.ts
│   └── ...
├── domain/               # Layers Core
│   └── dtos/   
│       └── auth/
│           └── login-user.dto.ts
│   └── entities/   
│   └── interfaces/
│   └── ...
├── infrastructure/       # Data access logic
│   └── repositories/   
│       └── users/
│           └── user.repository.ts
│   └── ...
├── presentation/         # Client Communication layer
│   └── users/
│       └── users.controller.ts
│   └── ...
├── models/               # Database models (Sequelize)
│   └── user.js
│   └── ...
config/                   # Configuration files
└── config.json
.env                      # Environment variables
server.ts                 # Main Express.js application
app.ts                    # Server startup


