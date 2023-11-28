import React, { useState, useEffect } from "react";
import "./home/Home.css";
import styled from "styled-components";

import recipeDB from "../apis/recipeDB";
import RecipeCard from "../components/RecipeCard";

const SavedRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([
    {
      CleanedIngredients: "tmp",
      Cuisine: "tmp",
      TotalTimeInMins: "",
      TranslatedInstructions: "",
      TranslatedRecipeName: "",
      imageUrl: "",
    },
  ]);

  const fetchAllRecipe = async () => { 
    const response = await recipeDB.get(`/getCollection?userId=656513edf8075d8eea4d2017`).catch((err) => {
      console.log(err, err.message);
    });
    if (response) {
      // console.log("Recipe ids: ",response);
      const resp = await recipeDB.post(`/recipes/getRecipesById`,response.data).catch((err) => {
        console.log(err, err.message);
      });
      // console.log("Response", resp)
      if (resp) {
        // console.log(resp.data);
        setAllRecipes(resp.data);
      } else {
        console.log("Failed to fetch recipes by id");
      }   
    } else {
      console.log("Failed to fetch collection of user");
    }
  };  

  useEffect(() => {
    fetchAllRecipe();
  }, []);

  useEffect(() => {
    console.log(allRecipes);
  }, [allRecipes]);

  return (
    <StyledCenterFlexer>
      <StyledHeader>Saved Recipes<AccessibleEmoji label="red heart" emoji="❤️" /></StyledHeader>
      <StyledFlexer>
        {allRecipes.map((recipe) => (
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
    </StyledCenterFlexer>
  );
};

export default SavedRecipes;

const StyledHeader = styled.div`
  font-size: 32px;
  text-align: center;
  margin: 22px auto;
  font-weight: 800;
`;

const StyledCenterFlexer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  text-align: center;
`;

const StyledFlexer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const AccessibleEmoji = ({ label, emoji }) => (
  <span role="img" aria-label={label}>
    {emoji}
  </span>
);
