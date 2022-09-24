const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('../models/recipe.js');



router.use(bodyParser.json()); //Handles JSON requests
router.use(bodyParser.urlencoded({ extended: false }));

//dashboard
router.get('/', async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden

  var user_requested = foundUser.username;
  const recipeNameArray = new Array();
  const recipeIdArray = new Array();

  console.log("request this user's recipe: " + user_requested);
  try {
    const user = await User.findOne({ username: user_requested }).exec();
    console.log("user found " + user.username);

    try {
      for await (const rid of user.recipes) {
        const recipe = await Recipe.findOne({ id: rid }).exec();
        recipeNameArray.push(recipe.recipeName);
        recipeIdArray.push(recipe.id);
      }

      const response = {
        recipeIdArray,
        recipeNameArray
      };
      var responseJSON = JSON.stringify(response, {
        headers: { 'Content-Type': 'application/json' },
      });
      res.json(responseJSON);


    } catch (err) {
      res.status(500).json({ 'message': err.message });

    }
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
});

router.get('/viewRecipe', async (req, res) => {
  var id = req.query.id;

  try {
    const recipe = await Recipe.findOne({ id: id }).exec();
    if (recipe) {

      res.render('viewRecipe', {
        recipe: recipe
      });
    }
  } catch (err) {
    throw err;
  }

});


router.post('/createRecipe', async (req, res) => {

  const { user, recipeName, note, ingredients, method, tags, cookingTime } = req.body;

  //new recipe
  User.findOne({ username: user }).exec((err, user) => {
    if (user) {
      const newRecipe = new Recipe({
        recipeName: recipeName,
        ingredients: ingredients,
        note: note,
        method: method,
        tags: tags,
        cookingTime: cookingTime,
      });
      newRecipe.save()
        .then((value) => {
          user.recipes.push(newRecipe._id);
          user.save()
            .then((value) => {
              res.status(201).json({ 'success': `New user ${newRecipe} created!` });
              console.log('successfully created a recipe');
              console.log(newRecipe);
            }).catch(value => {
              console.log(value);
              res.status(500).json({ 'message': err.message });
            });
        }).catch(value => {
          console.log(value);
          res.status(500).json({ 'message': err.message });
        });
    }
  });

});



router.post('/editRecipe', async (req, res) => {

  const { id, recipeName, note, ingredients, method, tags, cookingTime } = req.body;

  //new recipe
  Recipe.findOne({ _id: id }).exec((err, recipe) => {
    if (recipe) {
      recipe.recipeName = recipeName,
        recipe.note = note,
        recipe.ingredients = ingredients,
        recipe.method = method,
        recipe.tags = tags,
        recipe.cookingTime = cookingTime,
        recipe.save()
          .then((value) => {
            res.status(201).json({ 'success': `${recipe} edited!` });
            console.log('successfully edited a recipe');
            console.log(recipe);
          }).catch(value => {
            console.log(value);
            res.status(500).json({ 'message': err.message });
          });
    } else {
      res.status(500).json({ 'message': "no recipe found" });
    }
  });

});

router.post('/deleteRecipe', async (req, res) => {

  const { id, user } = req.body;

  try {
    const foundUser = await User.findOneAndUpdate({ username: user }, { $pull: { recipes: id } }).exec();
    console.log("user found " + foundUser.username);
    Recipe.deleteOne({ _id: id }).then(function () {
      console.log("Data deleted"); // Success
      res.status(201).json({ 'success': ` ${id} deleted` });
    }).catch(function (error) {
      console.log(error); // Failure
    });
  }
  catch (err) {
    res.status(500).json({ 'message': err.message });
  }

});

module.exports = router; 