# TeamUp Backend

## Description
This is the Node JS server for TeamUp's web application. It handles the api calls to manage user creation and authentication, recipe creation, deletion and updates. It is to be used in conjunction with the frontend React app and MongoDB

## Environment vars

This project uses the following environment variables:

| Name                 | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| NODE_ENV             | Specifies the environment (e.g. local, prod) we are running the app in |
| PORT                 | Specifies the port we wish to run the app on                           |
| ACCESS_TOKEN_SECRET  | Specifies the access token used for JWT purposes                       |
| REFRESH_TOKEN_SECRET | Specifies the refresh token used for JWT purposes                      |

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 16.0.0

# Getting started

- Clone the repository

```
git clone  git@github.com:Dendobot/TeamUp.git
```

- Install dependencies

```
cd backend
npm install
```

- run the backend

```
npm start
```


## Testing
To test the api endpoints, install VsCode Extension "Thunder Client". Then, run the application and test apis by creating new requests. <br> <br>
The purpose of Thunder Client is to test the backend without needing to run the frontend. This is useful when there are changes being done to the frontend / not working at the moment. The backend team does not have to rely on the frontend to test the api's in the backend.