# Sukureseptit
Sukureseptit is a service created as an exercise at
Aalto University course CS-E4400 Design of WWW Services.

## Project structure
Both frontend (React) and backend (Node) live on this repository.
Frontend code is in the [client](./client/) directory,
and backend code in the [server](./server/) directory.
There are two npm projects in this repository, one at root level (for server)
and other in the client directory.

## Development setup
Please use Node version 16.
Using [NVM](https://github.com/nvm-sh/nvm) might be a good idea.

```zsh
npm install
cd client
npm install
cd ..
npm start
```

This should install everything necessary and start development server,
both for frontend and backend.

## Production setup
TODO
