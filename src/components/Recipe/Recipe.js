import React from 'react';
import IngredientsContainer from './IngredientsContainer/IngredientsContainer';
import StepsContainer from './StepsContainer/StepsContainer';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    let { preparation_time, cooking_time, difficulty, measure_system, comments, recipe_ingredients, steps } = this.props.recipe;

    return (
      <div className='recipe-view-attributes-wrapper'>
        <section className='recipe-view-general-info-wrapper'>
          <label className='section-title'>General Information</label>
          <div className='recipe-view-general-info'>
            <div className='recipe-view-preparation-time-wrapper'>
              <label className='recipe-view-preparation-time-label'>Preparation Time:</label>
              <p className='recipe-view-preparation-time'>{ preparation_time }</p>
            </div>

            <div className='recipe-view-preparation-time-wrapper'>
              <label className='recipe-view-cooking-time-label'>Cooking Time:</label>
              <p className='recipe-view-cooking-time'>{ cooking_time }</p>
            </div>

            <div className='recipe-view-preparation-time-wrapper'>
              <label className='recipe-view-difficulty-label'>Difficulty:</label>
              <p className='recipe-view-difficulty'>{ difficulty }</p>
            </div>

            <div className='recipe-view-preparation-time-wrapper'>
              <label className='recipe-view-measure-system-label'>Measurement System:</label>
              <p className='recipe-view-measure-system'>{ measure_system }</p>
            </div>
          </div>
        </section>

        <section className='recipe-view-ingredients-wrapper'>
          <label className='section-title'>Ingredients</label>
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
            
            <IngredientsContainer recipeIngredients={ recipe_ingredients }/>
          </div>
        </section>

        <section className='recipe-view-steps-wrapper'>
          <label className='section-title'>Steps</label>
          <div className='recipe-view-steps'>
            <StepsContainer steps={ steps }/>
          </div>
        </section>

        <div className='recipe-view-comments-wrapper'>
          <label>Comments:</label>
          <p className='recipe-view-comments'>{ comments }</p>
        </div>
      </div>
    );
  }
}
 
export default Recipe;