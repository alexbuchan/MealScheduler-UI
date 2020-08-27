import React from 'react';
import PropTypes from 'prop-types';

import Recipe from './Recipe/Recipe';

const propTypes = {
  recipes: PropTypes.array
};

const RecipesContainer = ({ recipes }) => {
  return recipes.map((recipe, index) => {
    return (
      <Recipe key={ index } recipe={ recipe }/>
    );
  });
}

RecipesContainer.propTypes = propTypes;
export default RecipesContainer;