import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import CloseIcon from '../../../../assets/images/svg/close.svg';

class RecipeIngredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: '',
      measureSystem: {},
      defaultUnitOfMeasureValue: ''
    }
  }

  handleOnIngredientChange = (ev, value, index) => {
    const ingredient = this.props.ingredients.find(ingredient => ingredient.name === value.value);
    this.setState({ ingredient, defaultUnitOfMeasureValue: this.formatMeasureSystem(ingredient)[0].text });
    this.props.onIngredientChange(ev, value, index);
  }

  formatIngredients = () => {
    return this.props.ingredients.map(ingredient => { return { text: ingredient.name, value: ingredient.name } });
  }

  formatMeasureSystem = (ingredient) => {
    if (ingredient) {
      const units = this.props.measureSystem.measure_units.filter(unit => unit.measure_unit_type === ingredient.measure_unit_type);
      return units.map(unit => { return { text: unit.name, value: unit.name } });
    }

    return this.props.measureSystem.measure_units.map(unit => { return { text: unit.name, value: unit.name } });
  }

  render() {
    const { index, onIngredientChange, onAmountChange, onUnitOfMeasurementChange, deleteIngredient, label, ingredients, measureSystem } = this.props;

    return (
      <div className='recipe-ingredient-wrapper'>
        <div className='recipe-ingredient'>
          <div className='recipe-ingredient-dropdown-wrapper'>
            <div className='label-wrapper'>
              <label className='label'>{ label }</label>
            </div>
            <Dropdown
              className='recipe-ingredient-dropdown'
              placeholder='Ingredient'
              fluid
              selection
              options={ this.formatIngredients() }
              onChange={ (ev, value) => this.handleOnIngredientChange(ev, value, index) }
            />
          </div>

          <div className='recipe-ingredient-amount-wrapper'>
            <div className='label-wrapper'>
              <label className='label'>Amount</label>
            </div>
            <Input
              className='recipe-ingredient-amount'
              placeholder='Amount'
              name='amount'
              type='number'
              fluid
              label={ <Dropdown value={ this.state.defaultUnitOfMeasureValue } options={ this.formatMeasureSystem(this.state.ingredient) } onChange={ (ev, value) => onUnitOfMeasurementChange(ev, value, index) }/> }
              labelPosition='right'
              onChange={ (ev, value) => onAmountChange(ev, value, index) }
            />
          </div>
        </div>
        
        <div className='delete-ingredient-wrapper'>
          <button className='delete-ingredient-button' onClick={ () => deleteIngredient(index) }>
            <CloseIcon className='delete-ingredient-icon'/>
          </button>
        </div>
      </div>
    );
  }
}
 
export default RecipeIngredient;