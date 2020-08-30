import React from 'react';

const RecipeIngredientsContainer = ({ recipeIngredients }) => {
  return recipeIngredients.map(ingredient => ingredient);
}
 
export default RecipeIngredientsContainer;