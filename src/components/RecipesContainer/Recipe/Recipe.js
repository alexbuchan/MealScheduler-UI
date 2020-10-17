import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../../../lib/Helpers/helpers';
import { Link } from "react-router-dom";
import CloseIcon from '../../../assets/images/svg/close.svg';

const propTypes = {
  recipe: PropTypes.shape({
    active: PropTypes.bool,
    date: PropTypes.string,
    day: PropTypes.number,
    day_name: PropTypes.string,
    events: PropTypes.array,
  }).isRequired,
  t: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func,
  deleting: PropTypes.bool
};

const Recipe = ({ recipe, t, handleDeleteRecipe, deleting }) => {
  const minuteOrMinutes = (time) => {
    if (time === 1) {
      return t('recipes_view.time.minute');
    }

    return t('recipes_view.time.minutes');
  }

  const recipeComponentClass = () => {
    if (deleting) {
      return 'recipe-component-deleting';
    }

    return 'recipe-component';
  }

  return (
    <div className='recipe-component-wrapper'>
      <Link className={ recipeComponentClass() } to={ `/recipes/${recipe.id}` }>
        <div className='recipe-main-img-wrapper'>
          <img alt='img'></img>
        </div>

        <div className='recipe-body'>
          <div className='recipe-title-wrapper'>
            <h3 className='recipe-name'>{ recipe.name }</h3>

            <div className='recipe-subtitle-wrapper'>
              <div className='recipe-preparation-time-wrapper'>
                <label className='recipe-preparation-time-label'>{ capitalize(t('recipes_view.recipes_navbar.searchbar.options.preparation_time')) }</label>
                <h5 className='recipe-preparation-time'>{ recipe.preparation_time } { minuteOrMinutes(recipe.preparation_time) }</h5>
              </div>

              <h5 className='recipe-subtitle-separator'>|</h5>

              <div className='recipe-cooking-time-wrapper'>
                <label className='recipe-cooking-time-label'>{ capitalize(t('recipes_view.recipes_navbar.searchbar.options.cooking_time')) }</label>
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
      <button className='recipe-delete-button' to='/recipes/' onClick={ () => handleDeleteRecipe(recipe.id) }>
        <CloseIcon className='recipe-delete-icon'/>
      </button>
    </div>
  );
}

Recipe.propTypes = propTypes;
export default Recipe;