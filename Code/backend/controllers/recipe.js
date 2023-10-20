const express = require("express");
const { default: mongoose } = require("mongoose");
const getRecipe = express.Router();
const getCuisine = express.Router();
const postRecipe = express.Router();
const Recipe = require("../models/recipe");
const Error = require("../errors/error");

//************* Database Queries***************** */

/**
 * @summary Async Function to add Recipe Form data to database.
 * @param {Object} RecipeFormData - Form Data from the frontend that will be first parsed by the middleware and then added to the database.
 * @return {Void} Return Void.*/
async function postRecipes(addRecipeDetails) {
  console.log("inside model");
  console.log(typeof Recipe);
  try {
    const res = await Recipe.create(addRecipeDetails);
    console.log("1 document inserted");
    console.log(res);
  } catch (error) {
    console.log("Error in Post Recipes", error);
  }
}
/**
 * @summary Async Function to fetch Recipes from database based on the given query.
 * @param {Object} filters - All the filters from the query.
 * @param {Number} page - Page number for the result data *Not implemented*.
 * @param {Number} recipesPerPage - Limits the number of results in a api response *Not Implemented*.
 * @return {Object} Returns { recipesList: [Array], totalNumRecipes: Number }
 */
async function getRecipes({
  filters = null,
  page = 0,
  recipesPerPage = 10,
} = {}) {
  let query = {};
  console.log("Filters in getRecipes", filters);
  if (filters) {

    for (const prop in filters) {
      console.log(filters[prop], prop);
    }
    if (filters.CleanedIngredients) {
      var str = "(?i)";

      for (var i = 0; i < filters["CleanedIngredients"].length; i++) {
        const str1 = filters["CleanedIngredients"][i];
        str += "(?=.*" + str1 + ")";
      }
      query.CleanedIngredients = { $regex: str };
      console.log("the search string", str);
    }
    var time = parseInt(filters["totalTime"]);
    console.log(time, filters["TotalTimeInMins"], typeof(filters["totalTime"]));
    var budget = parseInt(filters["budget"]);
    if (time) {
      query.TotalTimeInMins = { $lte: time };
    }
    if (budget) {
      query.budget = { $lte: budget };
    }
    if (filters["typeOfDiet"]) {
      query.typeOfDiet = filters["typeOfDiet"];
    }
    if (filters.Cuisine) {
      query["Cuisine"] = { $regex: new RegExp(filters["Cuisine"], "i") };
    }
    console.log("Final Query for Database", query);
  }

  let cursor;
  let recipesList;
  let totalNumRecipes;

  try {
    cursor = await Recipe.find(query);
    // console.log(cursor);
  } catch (e) {
    console.error(`Unable to issue find command, ${e}`);
    return { recipesList: [], totalNumRecipess: 0 };
  }

  // const displayCursor = cursor.skip(page*recipesPerPage).limit(recipesPerPage);
  try {
    recipesList = cursor; //displayCursor.toArray();
    totalNumRecipes = cursor.length;
    return { recipesList, totalNumRecipes };
  } catch (e) {
    console.error(
      `Unable to convert cursor to array or problem counting documents, ${e}`,
    );
    return { recipesList: [], totalNumRecipes: 0 };
  }
  // try {
  // some code was deleted from before.

  // ********************Calori calculator code****************
  // var total_cal = 0;
  // await axios
  //   .get("https://api.calorieninjas.com/v1/nutrition?query=" + new_str, {
  //     headers: {
  //       "X-Api-Key": "XSCESI7dxnCa7WydS0dZdQ==2nqZmMFF8hXOwdkE",
  //     },
  //   })
  //   .then(function (response) {
  //     // handle success
  //     for (let i = 0; i < response.data.items.length; i++) {
  //       var temp = response.data.items[i].calories;
  //       // console.log(temp);
  //       total_cal += temp;
  //     }
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log("error:" + error);
  //   })
  //   .then(function () {
  //     // always executed
  //   });}
}
/**
 * @summary Async Function to get all the distinct Cuisine data from the database.
 * @return {Object} Returns all the documents containing distinct cuisines.
 */
async function getCuisines() {
  let cuisines = [];
  try {
    cuisines = await Recipe.distinct("Cuisine");
    return cuisines;
  } catch (e) {
    console.error(`Unable to get cuisines, ${e}`);
    return cuisines;
  }
}

//*************Recipe Controller******************/
/**
 * @summary Post Request handler for /Addrecipes route.
 * @return {Object} Returns Sucess message or error message.
 */
async function apiPostRecipes(req, res, next) {
  try {
    console.log("inside controller");
    let obj = await postRecipes(req.body);
    res.status(201).json({ obj, msg: "Success" });
  } catch (err) {
    console.log(err);
    throw new Error.BadRequestError(
      "There is something wrong with the Add Recipe Form",
    );
  }
}
/**
 * @summary Get Recipes request handler for /recipes Route.
 * @return {Object} Necessary Document based on query or error message.
 */
async function apiGetRecipes(req, res, next) {
  const recipesPerPage = req.query.recipesPerPage
    ? parseInt(req.query.recipesPerPage, 10)
    : 20;
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;

  let filters = {};
  console.log("Query from FrontEnd", { ...req.query });
  if (req.query.CleanedIngredients && req.query.CleanedIngredients != '""') {
    filters.CleanedIngredients = req.query.CleanedIngredients;
  }

  if (req.query.Cuisine && req.query.Cuisine != '""') {
    filters.Cuisine = req.query.Cuisine;
  }
  if (req.query.TotalTimeInMins) {
    filters.totalTime = req.query.TotalTimeInMins;
  }
  if (req.query.budget) {
    filters.budget = req.query.budget;
  }
  if (req.query.typeOfDiet) {
    filters.typeOfDiet = req.query.typeOfDiet;
  }
  try {
    const { recipesList, totalNumRecipes } = await getRecipes({
      filters,
      page,
      recipesPerPage,
    });

    let response = {
      recipes: recipesList,
      page: page,
      filters: filters,
      entries_per_page: recipesPerPage,
      total_results: totalNumRecipes,
    };
    return res.status(200).json({ response, msg: "Success" });
  } catch (error) {
    console.log(error);
    throw new Error.BadRequestError(
      "There was error processing your queries. Please try again",
    );
  }
}

/**
 * @summary Get Cuisine Request handler for /cuisine Route.
 * @return {Object} Returns Cuisines document with Success message or Error.
 */
async function apiGetRecipeCuisines(req, res, next) {
  try {
    let cuisines = await getCuisines();
    // console.log(cuisines);
    return res.status(200).json({ cuisines, msg: "Success" });
  } catch (e) {
    console.log(e);
    throw new Error.BadRequestError(`Something went wrong. Please try again`);
  }
}

module.exports = {
  apiGetRecipes,
  apiPostRecipes,
  apiGetRecipeCuisines,
};
