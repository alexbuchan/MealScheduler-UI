import React from 'react';
import PropTypes from 'prop-types';

// IMPORT ACTIONS
import Actions from '../../actions/recipe/RecipeActions';

// IMPORT STORES
import Store from '../../stores/RecipeStore/RecipeStore';

import Recipe from '../../components/Recipe/Recipe';
import Background from '../../components/Background/Background';
import withLoader from '../../HOC/Loader/Loader';
import Button from '../../components/formComponents/Button/Button';

import translations from './translations.json';
import { translate } from '../../lib/i18n/i18n';
let t = translate(translations);

const propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string
};

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      ingredientChecked: false,
      recipe: Store.getRecipeWithId(),
      locale: props.props.locale
    };

    this.t = t(props.props.locale);
    this.loadingTime = 500;
  }

  _onChange = () => {
    this.setState({
      recipe: Store.getRecipeWithId()
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      Actions
        .getRecipeWithId(this.props.id)
        .then(() => {
          this.setState({ isLoading: false });
        });
    });

    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  mainImageUrl = () => {
    if (this.state.recipe) {
      let mainImage = this.state.recipe.images.filter(image => image.image_type === 'main_image');
      if (mainImage.length === 1) {
        return mainImage[0].file_name;
      }
    }

    return '';
  }

  minuteOrMinutes = (time) => {
    if (time === 1) {
      return this.t('time.minute');
    }

    return this.t('time.minutes');
  }

  render() {
    let { name, preparation_time, cooking_time, difficulty, measure_system, comments, recipe_ingredients, steps } = this.state.recipe;
    this.t = t(this.state.locale);

    const RecipeWithLoader = withLoader(Recipe);
    return (
      <div className="recipe-view">
        <Background />
        <div className='recipe-view-body-wrapper'>
          <div className='recipe-view-body-no-scroll'>
            <div className='recipe-view-body'>
              <section className='recipe-view-header-section'>
                <div className='recipe-main-image-wrapper'>
                  <img className='recipe-main-image' src={ this.mainImageUrl() }></img>
                </div>
                <div className='recipe-view-general-info-wrapper'>
                  <div className='recipe-view-info-attribute-wrapper'>
                    <label className='recipe-view-info-attribute-label'>{ this.t('recipe_attributes.preparation_time') }</label>
                    <p className='recipe-view-info-attribute-value'>{ `${preparation_time} ${this.minuteOrMinutes(preparation_time)}` }</p>
                  </div>

                  <div className='recipe-view-info-attribute-wrapper'>
                    <label className='recipe-view-info-attribute-label'>{ this.t('recipe_attributes.cooking_time') }</label>
                    <p className='recipe-view-info-attribute-value'>{ `${cooking_time} ${this.minuteOrMinutes(preparation_time)}` }</p>
                  </div>

                  <div className='recipe-view-info-attribute-wrapper'>
                    <label className='recipe-view-info-attribute-label'>{ this.t('recipe_attributes.difficulty') }</label>
                    <p className='recipe-view-info-attribute-value'>{ difficulty }</p>
                  </div>

                  <div className='recipe-view-info-attribute-wrapper'>
                    <label className='recipe-view-info-attribute-label'>{ this.t('recipe_attributes.measurement_system') }</label>
                    <p className='recipe-view-info-attribute-value'>{ measure_system }</p>
                  </div>
                </div>
              </section>
              
              <div className='recipe-view-management'>
                <div className='recipe-view-title-wrapper'>
                  <h1 className='recipe-view-title'>{ name }</h1>
                </div>

                <div className='recipe-view-actions'>
                  <Button size='medium' type='normal' label='Gallery'/>
                  <Button size='medium' type='normal' label='Edit'/>
                  <Button size='medium' type='urgent' label='Delete'/>
                </div>
              </div>
              
              <RecipeWithLoader isLoading={ this.state.isLoading } recipe={ this.state.recipe }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RecipeView.propTypes = propTypes;
export default RecipeView;
