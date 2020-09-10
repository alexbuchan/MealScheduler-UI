import React from 'react';
import { Checkbox } from 'semantic-ui-react';

class Ingredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientChecked: false
    }
  }

  toggleActiveIngredient = () => {
    this.setState({ ingredientChecked: !this.state.ingredientChecked });
  }

  isIngredientChecked = () => {
    if (this.state.ingredientChecked) {
      return '-checked';
    }

    return '';
  }

  lineThroughIfChecked = () => {
    if (this.state.ingredientChecked) {
      return <div className='recipe-view-ingredient-wrapper-line-through'></div>;
    }

    return null;
  }

  pluraliseUnitOfMeasurement = () => {
    if (this.props.ingredient.amount === 0 || this.props.ingredient.amount > 1) {
      return this.props.ingredient.measure_unit + 's';
    }

    return this.props.ingredient.measure_unit;
  }

  render() {
    const { ingredient } = this.props;

    return (
      <>
        <div className={ `recipe-view-ingredient-wrapper${ this.isIngredientChecked() }` }>
          { this.lineThroughIfChecked() }
          <div className='recipe-view-ingredient-name-wrapper'>
            <p className='recipe-view-ingredient-name'>{ ingredient.name }</p>
          </div>

          <div className='recipe-view-ingredient-amount-wrapper'>
            <p className='recipe-view-ingredient-amount'>{ ingredient.amount }</p>&nbsp;
            <p className='recipe-view-ingredient-measure-unit'>{ this.pluraliseUnitOfMeasurement() }</p>
          </div>

          <div className='recipe-view-ingredient-check-wrapper'>
            <div className='recipe-view-ingredient-check-button'>
              <Checkbox onChange={ this.toggleActiveIngredient } />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Ingredient;