import React from 'react';
import Ingredient from './Ingredient/Ingredient';

const IngredientsContainer = ({ recipeIngredients }) => {
  if (recipeIngredients) {
    return recipeIngredients.map((ingredient, index) => {
      return (
        <Ingredient key={ index } ingredient={ ingredient }/>
      );
    });
  }
  
  return null;
}
 
export default IngredientsContainer;