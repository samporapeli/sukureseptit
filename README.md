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
Please use Node version 14.
Using [NVM](https://github.com/nvm-sh/nvm) might be a good idea.

You should have a `.env` file at the root of the project with content like this:

```bash
SUKURESEPTIT_SECRET=your_own_secret_token_here
```
Where token can be generated by e.g. running
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

Then run these commands:

```zsh
npm install
cd client
npm install
cd ..
npm run create-fake-data
npm start
```

This should install everything necessary and start development server,
both for frontend and backend.

## Production setup
Set right api base url in client config.js and run `npm run deploy`

## Component template script
You can create new components using a bash script.
In the directory client/src/ run this:

```zsh
./create_component.sh ComponentName
```

If successful, it will create a file in ./components/ComponentName.js,
containing the basic structure of a React component.
