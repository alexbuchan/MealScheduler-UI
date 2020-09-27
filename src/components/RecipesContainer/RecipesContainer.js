import React from 'react';
import PropTypes from 'prop-types';

import Recipe from './Recipe/Recipe';

const propTypes = {
  recipes: PropTypes.array,
  t: PropTypes.func
};

const RecipesContainer = ({ recipes, t }) => {
  return recipes.map((recipe, index) => {
    return (
      <Recipe key={ index } recipe={ recipe } t={ t }/>
    );
  });
}

RecipesContainer.propTypes = propTypes;
export default RecipesContainer;