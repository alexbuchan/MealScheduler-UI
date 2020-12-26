import React from 'react';
import IngredientsContainer from './IngredientsContainer/IngredientsContainer';
import StepsContainer from './StepsContainer/StepsContainer';

const Recipe = ({ recipe }) => {
  return (
    <div className='recipe-view-attributes-wrapper'>
      <section className='recipe-view-ingredients-wrapper'>
        <div className='section-title-wrapper'>
          <label className='section-title'>Ingredients</label>
        </div>
        <div className='recipe-view-ingredients'>
          <div className='recipe-view-ingredients-info-bar'>
            <div className='recipe-view-ingredients-info-bar-name'>
              <label className='recipe-view-ingredient-name-label'>Name</label>
            </div>

            <div className='recipe-view-ingredients-info-bar-amount'>
              <label className='recipe-view-ingredient-amount-label'>Amount</label>
            </div>

            <div className='recipe-view-ingredients-info-bar-checked'>
              <label className='recipe-view-ingredient-checked'>Checked</label>
            </div>
          </div>

          <IngredientsContainer recipeIngredients={ recipe.recipe_ingredients }/>
        </div>
      </section>

      <section className='recipe-view-steps-wrapper'>
        <div className='section-title-wrapper'>
          <label className='section-title'>Steps</label>
        </div>

        <div className='recipe-view-steps'>
          <StepsContainer steps={ recipe.steps }/>
        </div>
      </section>
    </div>
  );
}

export default Recipe;