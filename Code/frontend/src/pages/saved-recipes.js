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
    const response = await recipeDB.get("/recipes").catch((err) => {
      console.log(err, err.message);
    });
    if (response) {
      console.log(response.data);
      setAllRecipes(response.data.response.recipes);
    } else {
      console.log("Failed...");
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
