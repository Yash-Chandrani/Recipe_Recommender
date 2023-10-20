const parsingRecipeData = (req, res, next) => {
  console.log(req.body);
  req.body.TranslatedRecipeName = req.body.recipe_name;
  req.body.CleanedIngredients = req.body.recipe_ingredients;
  req.body.Cuisine = req.body.recipe_cuisine;
  req.body.TotalTimeInMins = req.body.recipe_time;
  req.body.imageUrl = req.body.recipe_url;
  req.body.TranslatedInstructions = req.body.recipe_instructions;
  req.body.budget = req.body.recipe_budget;
  req.body.typeOfDiet = req.body.food_pref;
  next();
};

module.exports = parsingRecipeData;
