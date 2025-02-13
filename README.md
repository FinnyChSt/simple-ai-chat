# simple-ai-chat

This is a simple app to locally chat with you chosen AI from ollama
It is designed to be an easy-to-use chatbot running locally on your machine.

## Setup

To setup the app you need to have the following installed:

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [ollama](https://ollama.com/)

To setup the app you need to run the following commands:

```bash
npm install
npm run web-app-build
```

## Run

To run the app you need to run the following commands:

```bash
npm start
```

If you want to use a mariadb database you can run the following command:

```bash
docker-compose up -d
```

## Documentation

The application consists of two parts:

Backend: A Node.js service
Frontend: A web app Single Page Application served under the root route ("/")

further documentation can be found in the [docs-Folder](docs):

- [service documentation](docs/service-documentation.md)
