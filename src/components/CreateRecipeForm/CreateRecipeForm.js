import React from 'react';

// IMPORT ACTIONS
import Actions from '../../actions/schedule/ScheduleActions';
import RecipeActions from '../../actions/recipe/RecipeActions';

// IMPORT STORES
import RecipeStore from '../../stores/RecipeStore/RecipeStore';

// IMPORT COMPONENTS
import Form from '../Form/Form';
import { Dropdown } from 'semantic-ui-react';
import RecipeStepsWrapper from '../RecipeStepsWrapper/RecipeStepsWrapper';
import RecipeIngredientsWrapper from '../RecipeIngredientWrapper/RecipeIngredientsWrapper';
import { Input } from 'semantic-ui-react'

const propTypes = {};

class CreateRecipeForm extends React.Component {
  state = {
    form: {
      name: '',
      preparationTime: '',
      cookingTime: [],
      difficulty: '',
      steps: {},
      measureSystem: RecipeStore.getRecipesState().measureSystems.find(system => system.name === 'metric'),
      selectedIngredients: [],
      comments: ''
    },
    ingredients: RecipeStore.getRecipesState().ingredients,
    measureSystems: RecipeStore.getRecipesState().measureSystems
  }

  _onChange = () => {
    const form = [ ...this.state.form ];
    form.measureSystem = RecipeStore.getRecipesState().measureSystems.find(system => system.name === 'metric');

    this.setState({
      ingredients: RecipeStore.getRecipesState().ingredients,
      measureSystems: RecipeStore.getRecipesState().measureSystems,
      form
    });
  }

  componentDidMount() {
    RecipeActions.getIngredients();

    RecipeStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    RecipeStore.removeChangeListener(this._onChange);
  }

  handleOnSubmit = () => {
    const ingredientsArray = this.state.form.selectedIngredients.map(ingredient => {
      return {
        ingredient_id: this.findIngredientId(ingredient.ingredient), 
        amount: ingredient.amount, 
        measure_unit_id: this.findMeasureUnitId(ingredient.unitOfMeasurement)
      } 
    });

    let stepsArray = this.state.form.steps.map(stepObj => Object.entries(stepObj).flat());
    stepsArray = stepsArray.flat().join('-');

    const form = { ...this.state.form };
    form.selectedIngredients = ingredientsArray;
    form.steps = stepsArray;
    RecipeActions.createRecipe(form);
    this.props.closeModal();
  }

  handleTextFieldChange = (ev) => {
    ev.preventDefault();

    const form = { ...this.state.form };
    form[ev.target.name] = ev.target.value;
    this.setState({ form });
  }

  handleUpdateStepValues = (steps) => {
    const form = { ...this.state.form };
    form.steps = steps;
    this.setState({ form });
  }

  findIngredientId = (ingredientName) => {
    if (ingredientName) {
      return this.state.ingredients.find(ingredient => ingredient.name === ingredientName).id;
    }

    return null;
  }

  findMeasureUnitId = (unitOfMeasurement) => {
    if (unitOfMeasurement) {
      return this.state.form.measureSystem.measure_units.find(unit => unit.name === unitOfMeasurement).id;
    }

    return null;
  }

  handleUpdateIngredientValues = (ingredients) => {
    const form = { ...this.state.form };

    form.selectedIngredients = ingredients;
    this.setState({ form });
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  eventTypes = () => {
    return this.state.eventTypes.map((event, index) => { return { value: index, text: this.capitalize(event.name) } });
  }

  dateFrequencies = () => {
    return this.state.dateFrequencies.map((frequency, index) => { return { value: index, text: frequency.name } });
  }

  formatMeasureSystems = () => {
    return this.state.measureSystems.map((system, index) => { return { value: system.name, text: system.name } });
  }

  handleDifficultyChange = (_, { value }) => {
    const form = { ...this.state.form };
    const difficulty = value;
    form.difficulty = difficulty;

    this.setState({ form });
  }

  handleMeasurementSystemChange = (_, { value }) => {
    const form = { ...this.state.form };
    const measureSystems = [ ...this.state.measureSystems ];
    form.measureSystem = measureSystems.find(system => system.name === value);

    this.setState({ form });
  }

  renderInvisibleColumn = () => {
    return (
      <div className='create-recipe-form-row-item-wrapper'>
        <div className='create-recipe-form-row-name'>
          <p className='invisble-column'></p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='create-recipe-body'>
        <h3>Create Recipe</h3>
        <Form
          submitButtonLabel='Create Event'
          onSubmit={ this.handleOnSubmit }
        >
          <div className='create-recipe-form'>
            <div className='create-recipe-form-row'>
              <div className='create-recipe-form-row-item-wrapper'>
                <div className='create-recipe-form-row-name'>
                  <div className='label-wrapper'>
                    <label className='label'>Name</label>
                  </div>
                  <Input
                    className='name-text-input'
                    placeholder='Name'
                    name='name'
                    onChange={ this.handleTextFieldChange }
                  />
                </div>
              </div>

              <div className='create-recipe-form-row-item-wrapper'>
                <div className='create-recipe-form-row-recipe-difficulty'>
                  <div className='label-wrapper'>
                    <label className='label'>Difficulty</label>
                  </div>
                  <Dropdown
                    placeholder='Difficulty'
                    fluid
                    selection
                    options={ [{ text: 'easy', value: 'easy' }, { text: 'medium', value: 'medium' }, { text: 'hard', value: 'hard' }, { text: 'very hard', value: 'very hard' }] }
                    onChange={ this.handleDifficultyChange }
                  />
                </div>
              </div>
            </div>

            <div className='create-recipe-form-row'>
              <div className='create-recipe-form-row-item-wrapper'>
                <div className='create-recipe-form-row-name'>
                  <div className='label-wrapper'>
                    <label className='label'>Preparation Time</label>
                  </div>
                  <Input
                    className='name-text-input'
                    placeholder='Preparation Time'
                    name='preparationTime'
                    type='number'
                    label={ { tag: false, content: 'minutes' } }
                    labelPosition='right'
                    onChange={ this.handleTextFieldChange }
                  />
                </div>
              </div>

              <div className='create-recipe-form-row-item-wrapper'>
                <div className='create-recipe-form-row-name'>
                  <div className='label-wrapper'>
                      <label className='label'>Cooking Time</label>
                    </div>
                    <Input
                      className='name-text-input'
                      placeholder='Cooking Time'
                      name='cookingTime'
                      type='number'
                      label={ { tag: false, content: 'minutes' } }
                      labelPosition='right'
                      onChange={ this.handleTextFieldChange }
                    />
                </div>
              </div>
            </div>

            <div className='create-recipe-form-row'>
              <div className='create-recipe-form-row-item-wrapper'>
                <div className='create-recipe-form-row-name'>
                  <div className='label-wrapper'>
                    <label className='label'>Measurement System</label>
                  </div>
                  <Dropdown
                    placeholder='Measurement System'
                    fluid
                    selection
                    options={ this.formatMeasureSystems() }
                    onChange={ this.handleMeasurementSystemChange }
                  />
                </div>
              </div>

              { this.renderInvisibleColumn() }
            </div>

            <div className='create-recipe-form-row create-recipe-form-row-4'>
              <div className='create-recipe-form-row-ingredients-wrapper'>
                <RecipeIngredientsWrapper
                  updateIngredientValues={ this.handleUpdateIngredientValues }
                  ingredients={ this.state.ingredients }
                  measureSystem={ this.state.form.measureSystem }
                />
              </div>
            </div>

            <div className='create-recipe-form-row create-recipe-form-row-5'>
              <div className='create-recipe-form-row-steps-wrapper'>
                <RecipeStepsWrapper updateStepValues={ this.handleUpdateStepValues }/>
              </div>
            </div>

            <div className='create-recipe-form-row create-recipe-form-row-6'>
              <div className='create-recipe-form-row-comments'>
                <label className='create-recipe-form-row-comments-label'>Comments</label>
                <textarea
                  className='create-recipe-form-row-comments-textarea'
                  name='comments'
                  onChange={ this.handleTextFieldChange }
                  value={ this.state.form.comments }
                >
                </textarea>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

CreateRecipeForm.propTypes = propTypes;
export default CreateRecipeForm;

// :id,
// :name,
// :measure_system_id,
// :preparation_time,
// :cooking_time,
// :difficulty,
// :steps,
// recipe_ingredients_attributes: [
//   :ingredient_id,
//   :amount,
//   :measure_unit_id
// ]
// :comments,


// name => text input DONE
// difficulty => dropdown DONE
// preparation_time => number input DONE
// cooking_time => number input DONE
// measure_system => dropdown (API) DONE
// steps => CUSTOM COMPONENT DONE
// ingredients => CUSTOM COMPONENT (ingredient id, amount, measure unit) DONE
// comments => text input DONE