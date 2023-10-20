import React, { Component } from "react";
import recipeDB from "../apis/recipeDB";

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
      recipes: [],
    };
  }

  // function to change cuisine state, triggered on selection of a cuisine item.
  /*cuisineUpdate = (event) => {

        this.setState (
            {
                cuisine : event.target.value,
                numberIngredients : this.state.numberIngredients,
                ingredients : this.state.ingredients
            }, () => console.log( this.state )
        )
    }
    */
  // function to update the maximum number of ingredients in the state.
  /*numberUpdate = (event) =>
    {
        this.setState (
            {
                cuisine : this.state.cuisine,
                numberIngredients: event.target.value,
                ingredients:this.state.ingredients
            }, () => console.log( this.state )
        )
    }*/

  // function to display the ingredients added by the user upto that point.
  printHander = () => {
    // converting the set into an array, to make it iterable
    const items = [...this.state.ingredients];

    // mapping each item to be displayed as a list item
    const list_items = items.map((item) => (
      <div
        key={item}
        onMouseDown={this.removeHandler}
        id={item}
        className="addedIngredient items-returned"
        style={{ flexWrap: "wrap" }}
      >
        {" "}
        {item}
      </div>
    ));

    return <div className="addedIngredientList">{list_items}</div>;
  };

  // fucntion to add ingredients to the inredients (set datastructure) in App's state
  // triggered by clicking add item button
  addHandler = () => {
    const ingredient = document.getElementById("ingredient").value;

    if (ingredient.trim() === "") {
      alert("Ingredient cannot be empty");
      return;
    }

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,
        ingredients: new Set(this.state.ingredients).add(ingredient),
      },
      () => console.log(this.state),
    );

    document.getElementById("ingredient").value = "";
  };

  // fucntion to add ingredients to the inredients (set datastructure) in App's state
  // triggered by clicking item that is displayed ysing printHandler function
  removeHandler = (event) => {
    var discardIngredient = event.target.id;
    var ingredientList = this.state.ingredients;

    ingredientList.delete(discardIngredient);

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,
        ingredients: ingredientList,
      },
      () => console.log(this.state),
    );
  };

  // function to send the data to the parent App component
  // uses the function that is sent through props from the App Component

  searchRecipe = async () => {
    const budget = document.getElementById("budget").value;
    const time = document.getElementById("time_to_cook").value;
    const pref = document.getElementById("food_pref").value;
    console.log("PREFERENCE", pref);

    const response = await recipeDB
      .get(
        `/recipes?CleanedIngredients=${this.state.ingredients}&Cuisine=${this.state.ingredients}&budget=${budget}&TotalTimeInMins=${time}&typeOfDiet=${pref}`,
      )
      .catch((err) => {
        console.log(err, err.message);
      });
    if (response) {
      console.log(response.data);
      this.setState({
        // cuisine : "Any",
        //numberIngredients : 0,
        ingredients: new Set(),
        cuisineState: 0,
        cuisine: "",
        recipes: response.data.recipes,
      });
    } else {
      console.log("Failed...");
    }
  };

  handleSubmit = (event) => {
    this.setState(
      {
        cuisine: document.getElementById("cuisine").value,
      },
      () => console.log(this.state),
    );

    event.preventDefault();
    var dict = {};
    dict["ingredient"] = this.state.ingredients;
    dict["cuisine"] = document.getElementById("cuisine").value;
    dict["time_to_cook"] = document.getElementById("time_to_cook").value;
    dict["budget"] = document.getElementById("budget").value;
    dict["time_to_cook"] = document.getElementById("time_to_cook").value;
    dict["food_pref"] = document.getElementById("food_pref").value;

    console.log(dict);

    this.props.sendFormData(dict);
    document.getElementById("cuisine").value = "";

    // this.searchRecipe();
  };

  // render function dispays the UI content i.e the form content
  render() {
    // returns jsx element
    return (
      <div className="formOutercontainer">
        <form onSubmit={this.handleSubmit}>
          <div className="add-a-recipe">Search a Recipe</div>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white flexer-new">
              <label className="sideLabel-new"> Ingredient: </label>
              <div>
                <div className="input-group-append form-input">
                  <input type="text" id="ingredient" />
                </div>
              </div>
            </div>
            <div>
              <button onClick={this.addHandler} type="button" id="addButton">
                Add item
              </button>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white flexer-new">
              <label className="sideLabel-new"> Cuisine: </label> <br />
              <div className="input-group-append form-input">
                <input type="text" id="cuisine" />
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white flexer-new">
              <label className="sideLabel-new"> Budget: </label> <br />
              <div className="input-group-append form-input">
                <input type="text" id="budget" />
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white flexer-new">
              <label className="sideLabel-new">Time to cook:</label> <br />
              <select
                name="time_to_cook"
                id="time_to_cook"
                className="form-input"
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
              </select>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white flexer-new">
              <label className="sideLabel-new">Preference:</label> <br />
              <select
                style={{ width: "auto" }}
                name="time_to_cook"
                id="food_pref"
                className="form-input"
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white flexer-new">
              <div className="input-group-append form-input">
                <div className="row pb-1">
                  <div className="input-group col-lg-4 flexer-new">
                    <label className="sideLabel-new">Added Items:</label>
                    {this.printHander()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4">
              <button type="button" id="submit" onClick={this.handleSubmit}>
                Search Recipes
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
