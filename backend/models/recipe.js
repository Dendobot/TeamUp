const mongoose = require('mongoose');
const RecipeSchema = new mongoose.Schema({

  recipeName: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: false
  },
  ingredients: {
    type: [String],
    required: true
  },
  method: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: false
  },
  cookingTime: {
    type: Number,
    required: false
  },
  photo_url: {
    type: String,
    required: false
  },


});
const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
