import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

const propTypes = {
  recipe: PropTypes.shape({
    active: PropTypes.bool,
    date: PropTypes.string,
    day: PropTypes.number,
    day_name: PropTypes.string,
    events: PropTypes.array
  }).isRequired
};

const Recipe = ({ recipe }) => {
  const minuteOrMinutes = (time) => {
    if (time === 1) {
      return 'minute';
    }

    return 'minutes';
  }

  return ( 
    <Link className='recipe-component' to={ `/recipes/${recipe.id}` }>
      <div className='recipe-main-img-wrapper'>
        <img alt='img'></img>
      </div>

      <div className='recipe-body'>
        <div className='recipe-title-wrapper'>
          <h3 className='recipe-name'>{ recipe.name }</h3>

          <div className='recipe-subtitle-wrapper'>
            <div className='recipe-preparation-time-wrapper'>
              <label className='recipe-preparation-time-label'>Preparation Time:</label>
              <h5 className='recipe-preparation-time'>{ recipe.preparation_time } { minuteOrMinutes(recipe.preparation_time) }</h5>
            </div>

            <h5 className='recipe-subtitle-separator'>|</h5>

            <div className='recipe-cooking-time-wrapper'>
              <label className='recipe-cooking-time-label'>Cooking Time:</label>
              <h5 className='recipe-cooking-time'>{ recipe.cooking_time } { minuteOrMinutes(recipe.cooking_time) }</h5>
            </div>
          </div>
        </div>
        
        <div className='recipe-difficulty-tag-wrapper'>
          <div className='recipe-difficulty-tag'>
            <p className='recipe-difficulty'>{ recipe.difficulty }</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

Recipe.propTypes = propTypes;
export default Recipe;