import React from 'react';
import PropTypes from 'prop-types';

import Recipe from './Recipe/Recipe';

const propTypes = {
  recipes: PropTypes.array,
  t: PropTypes.func,
  handleDeleteRecipe: PropTypes.func,
  deletingRecipeId: PropTypes.number
};

const RecipesContainer = ({ recipes, t, handleDeleteRecipe, deletingRecipeId }) => {
  return recipes.map((recipe, index) => {
    let deleting = false;

    if (deletingRecipeId === recipe.id) {
      deleting = true;
    }

    return (
      <Recipe key={ index } recipe={ recipe } t={ t } handleDeleteRecipe={ handleDeleteRecipe } deleting={ deleting }/>
    );
  });
}

RecipesContainer.propTypes = propTypes;
export default RecipesContainer;