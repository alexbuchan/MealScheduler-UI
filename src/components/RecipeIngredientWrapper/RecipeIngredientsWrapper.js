import React from 'react';
import PropTypes from 'prop-types';

import RecipeIngredientsContainer from './RecipeIngredientsContainer/RecipeIngredientsContainer';
import RecipeIngredient from './RecipeIngredientsContainer/RecipeIngredient/RecipeIngredient';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '../../assets/images/svg/plus.svg';

const propTypes = {
  updateIngredientValues: PropTypes.func,
  ingredients: PropTypes.array,
  measureSystem: PropTypes.object,
  defaultMeasureSystem: PropTypes.object
};

class RecipeIngredientsWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      childrenArray: [],
      ingredientValues: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) this.props.updateIngredientValues(this.state.ingredientValues);
    if (prevProps.measureSystem !== this.props.measureSystem) {
      const childrenArray = [...this.state.childrenArray];
      const updatedChildrenArray = childrenArray.map((child, index) => {
        return React.cloneElement(
          child,
          { measureSystem: this.props.measureSystem }
        );
      });

      this.setState({
        childrenArray: updatedChildrenArray,
        defaultMeasureSystem: this.props.measureSystem
      });
    }
  }

  handleOnIngredientChange = (_, { value }, index, unitOfMeasurement) => {
    const ingredientValues = [...this.state.ingredientValues];
    ingredientValues[index].ingredient = value;

    this.setState({ ingredientValues });
  }

  handleOnAmountChange = (_, { value }, index) => {
    const ingredientValues = [...this.state.ingredientValues];
    ingredientValues[index].amount = value;

    this.setState({ ingredientValues });
  }

  handleOnUnitOfMeasurementChange = (_, { value }, index) => {
    const ingredientValues = [...this.state.ingredientValues];
    ingredientValues[index].unitOfMeasurement = value;

    this.setState({ ingredientValues });
  }

  handleAddIngredient = () => {
    const childrenArray = [...this.state.childrenArray];
    const ingredientValues = [...this.state.ingredientValues];

    ingredientValues.push({ ingredient: '', amount: '', unitOfMeasurement: '' });

    childrenArray.push(
      <RecipeIngredient
        key={ uuidv4() }
        index={ childrenArray.length }
        onIngredientChange={ this.handleOnIngredientChange }
        onAmountChange={ this.handleOnAmountChange }
        onUnitOfMeasurementChange={ this.handleOnUnitOfMeasurementChange }
        deleteIngredient={ this.handleDeleteIngredient }
        addIngredient={ this.handleAddIngredient }
        label={ `Ingredient ${ childrenArray.length + 1 }` }
        ingredients={ this.props.ingredients }
        measureSystem={ this.props.measureSystem }
      />
    );

    this.setState({
      childrenArray: childrenArray,
      ingredientValues: ingredientValues
    });
  }

  handleDeleteIngredient = (index) => {
    const childrenArray = [...this.state.childrenArray];
    const ingredientValues = [...this.state.ingredientValues];

    ingredientValues.splice(index, 1);
    childrenArray.splice(index, 1);

    const updatedChildrenArray = childrenArray.map((child, index) => {
      return React.cloneElement(
        child,
        { index, label: `Ingredient ${ index + 1 }` }
      );
    });

    this.setState({
      childrenArray: updatedChildrenArray
    });
  }

  render() {
    return (
      <div className='recipe-ingredients'>
        <div className='recipe-ingredients-header'>
          <p className='invisible-wrapper'></p>

          <h4 className='recipe-ingredients-title'>Ingredients</h4>

          <div className='recipe-ingredients-add-ingredient-wrapper'>
            <label className='recipe-ingredients-add-ingredient-label'>Add Ingredient</label>

            <button className='recipe-ingredients-add-ingredient-button' onClick={ this.handleAddIngredient }>
              <AddIcon className='recipe-ingredients-add-ingredient-icon'/>
            </button>
          </div>
        </div>

        <div className='recipe-ingredients-body'>
          <RecipeIngredientsContainer recipeIngredients={ this.state.childrenArray } />
        </div>
      </div>
    );
  }
}

RecipeIngredientsWrapper.propTypes = propTypes;
export default RecipeIngredientsWrapper;