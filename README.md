## TeamUp

This project is being worked on as a part of COMP30022, a subject titled "IT Project" from the University of Melbourne. In this semester (Semester 2, 2022) our goal was to create a platform where individuals will be able to store any recipes that are special to them or recipes that they may frequent often. 

Currently, the website is deskptop compatible but we are aiming for it to be on mobile as well. 

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
│   ├── README.md
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
│   │   │   ├── index.js
│   │   │   ├── Navigation.js
│   │   │   ├── RecipeBox.js
│   │   │   ├── RequiredAuth.js
│   │   │   ├── SignOutButton.js
│   │   │   └── UploadAndDisplayImage.js
│   │   └── context
│   │   │   └── AuthProvider.js
│   │   └── hooks
│   │   │   ├── userAuth.js
│   │   │   ├── userAxiosPrivate.js
│   │   │   └──userRefreshToken.js
│   │   └── pages
│   │   │   ├── About.js
│   │   │   ├── AddRecipe.js
│   │   │   ├── EditRecipe.js
│   │   │   ├── Landing.js
│   │   │   ├── MyRecipes.js
│   │   │   ├── Recipes.js
│   │   │   ├── SignIn.js
│   │   │   ├──SignUp.js
│   │   │   └── ViewRecipe.js
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
└── README.md


```

## Features

  1. Sign up on website (Has been implemented)
  2. Login in on Website (Has been implemented)
  3. View saved recipes (Has been implemented)
  4. Edit existing recipes (Has been implemented)
  5. Add new recipes (Has been implemented)
      - Can upload images of the food
      - Can tag recipes as vegetarian, gluten-free etc. 
  6. Delete recipes (Has been implemented)

## Documentation 
We are storing all the documentation related to this project on our confluence page, which you can find [here](https://comp30022-teamup.atlassian.net/l/cp/GpTEtpdV)

## Testing

For instructions on how to run the frontend of the website, please look at the readme file in the [frontend](https://github.com/Dendobot/TeamUp/tree/main/frontend) folder. You will have to go ***cd*** into the frontend folder for testing this aspect.
For instructions on how to run the backend of the website, please look at the readme file in the [backend](https://github.com/Dendobot/TeamUp/tree/main/backend) folder.You will have to go ***cd*** into the backend folder for testing this aspect.

## Deployment

The Website has been deployed onto the heroku platform so you no longer need to compile the frontend and backend folders in order to run the website. Here is the link to the [website](https://cheffie.herokuapp.com/). 

