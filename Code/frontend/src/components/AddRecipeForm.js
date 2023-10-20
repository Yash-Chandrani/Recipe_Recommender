import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import recipeDB from "../apis/recipeDB";
import styled from "styled-components";

// Form component to maintain input form
class Form extends Component {
  // constructor for Form Component
  // We maintain user input as a state object

  constructor() {
    super();

    this.state = {
      // cuisine : "Any",
      //numberIngredients : 0,
      ingredients: new Set(),
      cuisineState: 0,
      cuisine: "",
      error: false,
      redirect: false,
    };
  }
  // function to send the data to the parent App component
  // uses the function that is sent through props from the App Component
  handleRecipeSubmit = (event) => {
    event.preventDefault();
    var dict = {};
    dict["recipe_name"] = document.getElementById("recipe_name").value;
    dict["recipe_cuisine"] = document.getElementById("recipe_cuisine").value;
    dict["recipe_ingredients"] =
      document.getElementById("recipe_ingredients").value;
    dict["recipe_instructions"] = document.getElementById(
      "recipe_instructions",
    ).value;
    dict["recipe_time"] = document.getElementById("recipe_time").value;
    dict["recipe_url"] = document.getElementById("recipe_url").value;
    dict["recipe_budget"] = document.getElementById("recipe_budget").value;
    dict["food_pref"] = document.getElementById("food_pref").value;
    console.log(dict);

    let all_val_filled = [];
    Object.keys(dict).map((key, value) => {
      console.log(key, dict[key], value);
      if (dict[key] != "") {
        all_val_filled.push(key);
      }
    });

    // this.props.sendRecipeFormData(dict);
    console.log(all_val_filled);
    if (all_val_filled.length == 6) {
      this.submitToApi(dict);
      this.setState({
        // cuisine : "Any",
        //numberIngredients : 0,
        ingredients: new Set(),
        cuisineState: 0,
        cuisine: "",
        redirect: true,
        error: true,
      });
    } else {
      this.setState({
        // cuisine : "Any",
        //numberIngredients : 0,
        ingredients: new Set(),
        cuisineState: 0,
        cuisine: "",
        redirect: false,
        error: true,
      });
    }
  };

  submitToApi = async (dict) => {
    const response = await recipeDB
      .post("/recipes/Addrecipes", dict)
      .catch((err) => {
        console.log(err, err.message);
      });
    if (response) {
      console.log("Added...");
    } else {
      console.log("Failed...");
    }
  };

  renderRedirect = () => {
    return <Redirect to="/home" />;
  };

  // render function dispays the UI content i.e the form content
  render() {
    {
      console.log("AddRecipeForm Render Function");
    }

    // returns jsx element
    return (
      <div className="formOutercontainer">
        <form onSubmit={this.handleRecipeSubmit} required>
          <div className="add-a-recipe">Add a Recipe</div>
          {this.state.error && (
            <StyledError>Kindly fill all the fields.</StyledError>
          )}
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger flexer">
              <label className="sideLabel"> Recipe Name: </label>
              <div className="input-group-append">
                <input type="text" id="recipe_name" required={true} />
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger flexer">
              <label className="sideLabel"> Recipe Ingredients: </label> <br />
              <div className="input-group-append">
                <input type="textarea" id="recipe_ingredients" required />
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger flexer">
              <label className="sideLabel"> Recipe Instructions: </label> <br />
              <div className="input-group-append">
                <input type="text" id="recipe_instructions" required />
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger flexer">
              <label className="sideLabel"> Recipe Budget: </label> <br />
              <div className="input-group-append">
                <input type="text" id="recipe_budget" required />
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger flexer">
              <label className="sideLabel"> Recipe Cuisine: </label> <br />
              <div className="input-group-append">
                <input type="text" id="recipe_cuisine" required />
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger flexer">
              <label className="sideLabel"> Recipe Time: </label>
              <div className="input-group-append" style={{ width: "66%" }}>
                <select
                  name="time_to_cook"
                  id="recipe_time"
                  className="form-input"
                  style={{ width: "100%" }}
                >
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                  <option value="60">60</option>
                </select>
                {/* <input type="text" id="recipe_time" /> */}
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger flexer">
              <label className="sideLabel"> Recipe Time: </label>
              <div className="input-group-append" style={{ width: "66%" }}>
                <select
                  name="time_to_cook"
                  id="food_pref"
                  className="form-input"
                  style={{ width: "100%" }}
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>
                {/* <input type="text" id="recipe_time" /> */}
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger flexer">
              <label className="sideLabel"> Recipe URL: </label> <br />
              <div className="input-group-append">
                <input type="text" id="recipe_url" />
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger">
              <div className="input-group-append">
                <div className="row pb-1">
                  <div className="input-group col-lg-4">
                    {this.state.redirect && this.renderRedirect()}
                    <button
                      type="button"
                      id="submit"
                      onClick={this.handleRecipeSubmit}
                    >
                      Submit Recipe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

const StyledError = styled.div`
  color: #c62828;
  background-color: #ef9a9a;
  border: 2px solid #c62828;
  padding: 8px;
  margin: 8px auto;
  border-radius: 8px;
`;
