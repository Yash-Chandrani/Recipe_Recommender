const express = require("express");
const {
  apiGetRecipeCuisines,
  apiGetRecipes,
  apiPostRecipes,
  apiGetRecipesById,
} = require("../controllers/recipe");
const getRecipe = express.Router();
const getCuisine = express.Router();
const postRecipe = express.Router();
const getRecipesById = express.Router();

//URl to get the recipes
getRecipe.route("/").get(apiGetRecipes);

postRecipe.route("/").post(apiPostRecipes);

getCuisine.route("/").get(apiGetRecipeCuisines);

getRecipesById.route("/").post(apiGetRecipesById);

module.exports = {
  getRecipe,
  postRecipe,
  getCuisine,
  getRecipesById
};
