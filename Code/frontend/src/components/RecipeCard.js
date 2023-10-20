import React from "react";
import "../pages/auth/login.css";

import styled from "styled-components";

const RecipeCard = ({
  CleanedIngredients,
  Cuisine,
  TotalTimeInMins,
  TranslatedInstructions,
  TranslatedRecipeName,
  imageUrl,
  budget,
}) => {
  const fetchYTId = (url) => {
    if (url.length > 0) {
      let tmp = url.split("be/")[1];
      tmp = tmp.split("?")[0];
      return tmp;
    }
  };

  const ingredientList = (CleanedIngredients) => {
    return CleanedIngredients.split(",");
  };

  const url = fetchYTId(imageUrl);

  return (
    <StyledContainer id="form_login">
      <StyledFlexer>
        <StyledRecipeName>{TranslatedRecipeName}</StyledRecipeName>
        <StyledTime>{TotalTimeInMins} mins</StyledTime>
      </StyledFlexer>
      <StyledYtIFrame>
        <iframe
          width="100%"
          src={`https://www.youtube.com/embed/${url}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </StyledYtIFrame>
      <StyledBudget>
        <StyledCuisine>Cuisine: {Cuisine}</StyledCuisine>
        Ingredients Required (Budget: ${budget})
      </StyledBudget>
      <StyledIngridients>
        {ingredientList(CleanedIngredients).map((ingredient) => (
          <StyledIngredient key={ingredient}>
            {ingredient}
            {", "}
          </StyledIngredient>
        ))}
      </StyledIngridients>

      <StyledInstructions>
        <b>Instructions: </b>
        {TranslatedInstructions}
      </StyledInstructions>
    </StyledContainer>
  );
};

{
  /* <iframe width="560" height="315" src="https://www.youtube.com/embed/yDLPnEMzvYA?si=SOPPnKHgLD32DAll" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

https://youtu.be/yDLPnEMzvYA?feature=shared */
}

export default RecipeCard;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  border-radius: 16px;
  padding: 12px;
  margin: 6px;
  max-height: 500px;
  overflow-y: scroll;
`;

const StyledFlexer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledRecipeName = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledTime = styled.div`
  background-color: #c8e6c9;
  /* color: #43a047;
    border: 2px solid #43a047; */
  padding: 4px;
  border-radius: 8px;
  min-width: 60px;
`;

const StyledYtIFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px auto;
`;

const StyledIngridients = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  text-align: left;
  word-wrap: break-word;
  background-color: #efefef;
  color: #333;
  border-radius: 6px;
  padding: 6px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const StyledIngredient = styled.div`
  padding: 2px;
  border-radius: 6px;
`;

const StyledInstructions = styled.div`
  padding-top: 4px;
  word-wrap: break-word;
  text-align: left !important;
  border-top: 4px solid #eeeeee;
  margin-top: 10px;
`;

const StyledBudget = styled.div`
  background-color: #bababa;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  opacity: 0.4;
  padding: 4px 8px;
  text-align: left;
  color: black;
  font-weight: 800;
`;

const StyledCuisine = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
