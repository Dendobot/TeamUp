## TeamUp

This respository holds all the necessary code and files required to compile and run our website. 

## File Structure
```bash
├── backend
│   └── config
│   │   ├── allowedOrigins.js
│   │   ├── corsOptions.js
│   │   ├── db
│   │   ├── verifyJWT.js
│   └── middleware
│   │   └── errorHandler.js
│   └── models
│   │   ├── clearDataBase
│   │   ├── placeholder.js
│   │   ├── recipe.js
│   │   └── user.js
│   └── routes
│   │   ├── admin.js
│   │   ├── recipe.js
│   │   ├── users.js
│   └── thunder-tests
│   │   ├── thunderActivity.json
│   │   ├── thunderclient.json
│   │   ├── thunderColelction.js
│   │   └── thunderEnvironment.js
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
├── frontend
│   └── node_modules
│   └── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── landingPageImg.svg
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manigest.json
│   │   ├── robots.txt
│   ├── src
│   │   └── api
│   │   │   ├── axios.js
│   │   └── components
│   │   │   ├── BottomBar.js
│   │   │   ├── Footer.js
│   │   │   ├── LoggedInNavBar.js
│   │   │   ├── Navigation.js
│   │   │   ├── UploadAndDisplayImage.js
│   │   │   ├── index.js
│   │   │   └──placeholder.js
│   │   └── context
│   │   │   └── AuthProvider.js
│   │   └── hooks
│   │   │   ├── userAuth.js
│   │   │   ├── userAxiosPrivate.js
│   │   │   └──userRefreshToken.js
│   │   └── pages
│   │   │   ├── About.js
│   │   │   ├── AddRecipe.js
│   │   │   ├── Landing.js
│   │   │   ├── SignIn.js
│   │   │   ├──SignUp.js
│   │   │   └── placeholder.js
│   │   └── services
│   │   │   └── placeholder.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── styleSheet.css
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
└── .gitignore

```

## Testing

For instructions on how to run the frontend of the website, please look at the readme file in the [frontend](https://github.com/Dendobot/TeamUp/tree/main/frontend) folder.
For instruction on how to run the backend of the website, please look at the readme file in the [backend](https://github.com/Dendobot/TeamUp/tree/main/backend) folder.

