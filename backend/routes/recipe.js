const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('../models/recipe.js');
const verifyJWT = require("../config/verifyJWT");


router.use(bodyParser.json()); //Handles JSON requests
router.use(bodyParser.urlencoded({ extended: false }));
//verify token before give access to route
router.use(verifyJWT);


// @desc    get all recipes (id, name and photo) for a user
// @route   GET /recipe/viewRecipes
// @access  Private
router.get("/viewRecipes", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden

  var user_requested = foundUser.username;

  //clean up recipes
  try {
    await cleanRecipes(user_requested);
  } catch (err) {
    throw (err);
  }

  User.findOne({ username: user_requested }).exec(async (err, user) => {
    if (user) {
      console.log("user who requested the recipes is: ", user);
      const recipeInfo = [];
      try {
        console.log("user recipes", user.recipes);
        for (const recipeId of user.recipes) {
          const recipe = await Recipe.findOne({ _id: recipeId }).exec();
          console.log("recipe", recipe);
          recipeInfo.push({
            recipeId: recipe._id,
            recipeName: recipe.recipeName,
            photo: recipe.photo_url,
          });
        }

        const response = {
          recipeInfo
        };


        var responseJSON = JSON.stringify(response, {
          headers: { "Content-Type": "application/json" },
        });

        res.json(responseJSON);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      res.status(500).json({ message: "user does not exist" });
    }
  });
});


const cleanRecipes = async (user_requested) => {
  User.findOne({ username: user_requested }).exec(async (err, user) => {
    var functionalRecipes = [];
    for (const recipeId of user.recipes) {
      const recipe = await Recipe.findOne({ _id: recipeId }).exec();
      console.log("recipe", recipe);
      if (recipe) {
        functionalRecipes.push(recipe._id);
      }
    }
    user.recipes = functionalRecipes;
    user.save()
      .then((value) => {
        return false;
      }).catch(value => {
        return true;
      });
  });
};






// @desc    get one recipe detailed info for a user
// @route   GET /recipe/viewRecipe
// @access  Private
router.get('/viewRecipe', async (req, res) => {
  var id = req.query.id;
  console.log("id: " + id);
  if (id) {
    try {
      const recipe = await Recipe.findOne({ _id: id }).exec();
      if (recipe) {

        var responseJSON = JSON.stringify(recipe, {
          headers: { "Content-Type": "application/json" },
        });

        res.json(responseJSON);
      } else {
        res.status(404).json({ message: "recipe does not exist" });
      }


    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(500).json({ message: "recipe does not exist" });
  }
});

// @desc    create one recipe for a user
// @route   POST /recipe/createRecipe
// @access  Private
router.post('/createRecipe', async (req, res) => {

  const { user, recipeName, note, ingredients, method, tags, cookingTime, photo_url } = req.body;

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
        photo_url: photo_url,
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

// @desc    update a recipe for a user
// @route   POST /recipe/editRecipe
// @access  Private
router.post('/editRecipe', async (req, res) => {

  const { id, recipeName, note, ingredients, method, tags, cookingTime, photo_url } = req.body;

  //new recipe
  Recipe.findOne({ _id: id }).exec((err, recipe) => {
    if (recipe) {
      recipe.recipeName = recipeName,
        recipe.note = note,
        recipe.ingredients = ingredients,
        recipe.method = method,
        recipe.tags = tags,
        recipe.cookingTime = cookingTime,
        recipe.photo_url = photo_url;
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

// @desc    delete a particular recipe for a user
// @route   DELETE /recipe/deleteRecipe
// @access  Private
router.post('/deleteRecipe', async (req, res) => {

  const { id, user } = req.body;
  var _id = mongoose.mongo.ObjectId(id);
  try {
    const foundUser = await User.findOneAndUpdate({ username: user }, { $pull: { recipes: _id } }).exec();
    console.log("user found " + foundUser.username);
    await Recipe.deleteOne({ _id: _id }).then(function () {
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