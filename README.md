# Voda Blog

[![Portfolio](https://img.shields.io/badge/portfolio-fzachopoulos.com-blue?style=for-the-badge)](https://fzachopoulos.com/)

[![Live](https://img.shields.io/badge/live-blog.fzachopoulos.com-g?style=for-the-badge&logo=vercel)](https://blog.fzachopoulos.com/)

## Description

A blog application built with React, Tailwind CSS, TypeScript, Vite, Express.js, and MongoDB. The client is hosted on Vercel and the server is hosted on DigitalOcean. The database is hosted on MongoDB Atlas.

## Tech Stack

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Features

- Authentication
- CRUD operations for posts
- Like posts
- User profiles
- Long polling for new posts and likes
- Auto initialization of the database with dummy data from [JSON Placeholder](https://jsonplaceholder.typicode.com/)

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.16.0)
- [Docker](https://www.docker.com/) (v20.10.22) (optional)
- [MongoDB](https://www.mongodb.com/) (v5.0.3) (optional)
- Ports 3000, 3001, and 27017 available

## Environment Variables

Client:

- VITE_SERVER_AUTH_URL: The URL of the server's authentication endpoint.

Server:

- JWT_KEY: The secret key used to sign the JWT tokens.
- MONGO_URI: The URI of the MongoDB instance.
- PORT: The port the server will run on.
- NODE_ENV: The environment the server will run on. Can be 'dev' or 'docker' for local development.
- CORS_ORIGIN: The origin of the client. Used for CORS.

## How to Run

### Visit the live version

You can visit the live version of the application [here](https://blog.fzachopoulos.com/).

### The easy way (Docker is required)

1. Clone the repository.
2. On the root directory, run `npm run docker:run` to build and run the application in a Docker container.

```bash
  npm run docker:run
```

### The manual way

1. Clone the repository.
2. On the client directory, run `npm install` to install the dependencies.
3. On the server directory, run `npm install` to install the dependencies.
4. Make sure to have a MongoDB instance running on your machine. If you don't, you can use Docker to run one. Make sure the MongoDB instance is running on port 27017.
5. The environment variables are already set up for local development, but you can still modify them to match your setup. You can find them on the .env files on the client and server directories. In case you are using Docker, you can modify the environment variables on the docker-compose.yaml file.
6. On the server directory, run `npm run dev` to start the server.
7. On the client directory, run `npm run dev` to start the client.

In case you use Docker and want to modify the client's environmental variables, you can do so on the docker-compose.yaml file but make sure to change the .env file as well, because VITE requires them in build time.

```bash
  npm install
  npm run dev
```

## Future Improvements

- Add unit tests for the client and server.
- Replace the long polling with WebSockets.
- Add a search feature.
- Add a comment feature.
- Add a notification system.
- Add a password reset feature.
