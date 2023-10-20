import "./App.css";
import Form from "./components/Form.js";
import AddRecipeForm from "./components/AddRecipeForm.js";
import Header from "./components/Header";
import recipeDB from "./apis/recipeDB";
import RecipeCard from "./components/RecipeCard";
import styled from "styled-components";
import React, { Component } from "react";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import login from "./pages/auth/login";
import signup from "./pages/auth/signup";
import Home from "./pages/home/Home";
// Main component of the project
class App extends Component {
  // constructor for the App Component
  constructor() {
    super();

    this.state = {
      cuisine: "",
      //NoIngredients : 0,
      ingredients: new Set(),
      recipeList: [],
      email: "",
      flag: false,
      loginFlag: sessionStorage.getItem("login_recipe_recommender")
        ? true
        : false,
      loginId: sessionStorage.getItem("login_recipe_recommender"),
      cooking_time: "",
    };
    this.setLoginFlag.bind(this);
  }
  // Function to get the user input from the Form component on Submit action

  handleRecipeSubmit = async (formDict) => {
    const addRecipeDetails = {
      "Cleaned-Ingredients": formDict["recipe_ingredients"],
      Cuisine: formDict["recipe_cuisine"],
      TranslatedRecipeName: formDict["recipe_name"],
      TranslatedInstructions: formDict["recipe_instructions"],
      TotalTimeInMins: Number(formDict["recipe_time"]),

      "image-url": formDict["recipe_url"],
    };
    this.postRecipeDetails(addRecipeDetails);
  };

  postRecipeDetails = async (addRecipeDetails) => {
    try {
      console.log("inside app.js", addRecipeDetails);
      const response = await recipeDB.post(
        "recipes/Addrecipes",
        addRecipeDetails,
      );
      console.log(response.data);
      // this.setState({
      //   recipeList: response.data.recipes,
      // });
    } catch (err) {
      console.log(err);
    }
  };
  // Function to get the user input from the Form component on Submit action
  handleSubmit = async (formDict) => {
    this.setState({
      // cuisine: cuisineInput,
      //NoIngredients: noIngredientsInput,
      ingredients: formDict["ingredient"],
      cuisine: formDict["cuisine"],
      cooking_time: formDict["time_to_cook"],
      budget: formDict["budget"],
    });

    const items = Array.from(formDict["ingredient"]).join(" ");
    const cuis = formDict["cuisine"];
    const cook_time = formDict["time_to_cook"];
    const budget = formDict["budget"];
    const pref = formDict["food_pref"];
    this.getRecipeDetails(items, cuis, cook_time, budget, pref);
    //  alert(typeof(ingredientsInput["cuisine"]));
  };

  getRecipeDetails = async (ingredient, cuis, cook_time, budget, pref) => {
    console.log(ingredient, cuis, cook_time, budget);
    try {
      const response = await recipeDB
        .get(
          `/recipes?CleanedIngredients=${ingredient}&Cuisine=${cuis}&budget=${budget}&TotalTimeInMins=${cook_time}&typeOfDiet=${pref}`,
        )
        .catch((err) => {
          console.log(err, err.message);
        });
      this.setState({
        recipeList: response.data.response.recipes,
      });
      console.log(response.data.response.recipes);
      console.log(this.state.recipeList);
    } catch (err) {
      console.log(err);
    }
  };

  setLoginFlag() {
    console.log("set login flag");
    this.setState({
      loginFlag: sessionStorage.getItem("login_recipe_recommender")
        ? true
        : false,
      loginId: sessionStorage.getItem("login_recipe_recommender"),
      recipeList: [],
    });
  }

  render() {
    return (
      <Router>
        {/* handleSubmit function is being sent as a prop to the form component*/}

        <Switch>
          <Route
            exact
            path="/login"
            component={login}
            setLoginFlag={this.setLoginFlag}
          />

          <Route
            exact
            path="/sign-up"
            component={signup}
            setLoginFlag={this.setLoginFlag}
          />

          <Route path="/add-recipe">
            <Header loginFlag={this.state.loginFlag} />
            <AddRecipeForm sendRecipeFormData={this.handleRecipeSubmit} />
          </Route>

          <Route path="/search-recipe">
            <Header loginFlag={this.state.loginFlag} />
            <Form sendFormData={this.handleSubmit} />
            {/* <AddRecipeForm sendRecipeFormData={this.handleRecipeSubmit} /> */}

            {/* RecipeList is the component where results are displayed.
                  App's recipeList state item is being sent as a prop
                  */}

            {/* <RecipeList recipes={this.state.recipeList} /> */}

            <StyledFlexer>
              {console.log(this.state.recipeList)}
              {this.state.recipeList &&
                this.state.recipeList.map((recipe) => (
                  <RecipeCard
                    key={recipe.TranslatedRecipeName}
                    CleanedIngredients={recipe.CleanedIngredients}
                    Cuisine={recipe.Cuisine}
                    TotalTimeInMins={recipe.TotalTimeInMins}
                    TranslatedInstructions={recipe.TranslatedInstructions}
                    TranslatedRecipeName={recipe.TranslatedRecipeName}
                    imageUrl={recipe.imageUrl}
                    budget={recipe.budget}
                  />
                ))}
            </StyledFlexer>
          </Route>

          <Route path="/home">
            <Header loginFlag={this.state.loginFlag} />
            <Home />
          </Route>
          <Redirect exact from="/" to="login" />
        </Switch>
      </Router>
    );
  }
}

export default App;

const StyledFlexer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 28px;
`;
