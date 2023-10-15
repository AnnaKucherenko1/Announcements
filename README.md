# Announcements Project

This is the Announcements project, which includes both a server and a client application. The server and client are used for managing and displaying announcements. Additionally, the project includes tests for the client-side code.

## Getting Started

To get started with the Announcements project, follow these steps:

### Prerequisites

- Node.js: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
- Docker: The project includes a Docker container for MongoDB. Make sure Docker is installed on your system. You can download it from [docker.com](https://www.docker.com/products/docker-desktop).

### Server

1. Navigate to the root directory of the server application using your terminal.
 
    ```console
    cd server
    ```

3. Run the following command to install the server's dependencies:

    ```console
    npm install
    ```

4. Docker:
    The project includes a docker-compose file to spawn a mongodb container and a seed service that seeds 50 announcement items into the db on container start.
    Run the following command to compose the mongodb docker container and seed data:

    ```console
    npm compose
    ```
  #### Important note
  It will spawn container on a default mongodb port 27017. Please make sure there is no other mongodb server running on that port on your machine locally when running this application. Otherwise the BE might be connecting to your local mongodb database instead of the dockerised one with seeded data.
  
5. Run the following command to start the server:
   
    ```console
    npm start
    ```
Server is running on: http://localhost:4000/

### Client
1. Navigate to the root directory of the client application using your terminal.
   
    ```console
    cd client
    ```

2. Run the following command to install the client's dependencies:

    ```console
    npm install
    ```
3. Run the following command to start the app:
 
    ```console
    npm run dev
    ```
App is running on: http://localhost:5173/