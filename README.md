# LinkedOut
A replication of the popular LinkedIn social media website created using React to render the front-end view and a Express server connected to a MongoDB instance to handle read/writes to the database.

## Core Features
- Login and logout through JSON Web Token validation
- Read and write posts through http GET and POST requests to the backend

## Client Setup
1. Navigate to the `client` directory
2. Create a `.env` file with the following fields
```
REACT_APP_SERVER_URL={server_url}
```
3. `npm install` to install dependencies
4. `npm run start` to start the React app

## Server setup
1. Navigate to the `server` directory
2. Create a `.env.` file with the following fields
```
MONGODB_URI={MONGODB_URI}
PORT={PORT}
JWT_SECRET_KEY={JWT_KEY}
```
3. `npm install` to install dependencies
4. `node server.js` to run the server

## What's Next?
- Replace Firebase hosting and database with GitHub Pages and MongoDB
- Replace plain CSS files with Tailwind CSS
- Move rendering to server side with Next.js?
