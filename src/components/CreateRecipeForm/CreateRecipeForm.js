import React from 'react';

// IMPORT ACTIONS
import Actions from '../../actions/schedule/ScheduleActions';
import RecipeActions from '../../actions/recipe/RecipeActions';

// IMPORT STORES
import RecipeStore from '../../stores/RecipeStore/RecipeStore';

// IMPORT COMPONENTS
import Form from '../Form/Form';
import { Button, Dropdown } from 'semantic-ui-react';
import RecipeStepsWrapper from '../RecipeStepsWrapper/RecipeStepsWrapper';
import RecipeIngredientsWrapper from '../RecipeIngredientWrapper/RecipeIngredientsWrapper';
import { Input, Icon } from 'semantic-ui-react'
import Carousel from '../Carousel/Carousel';

const propTypes = {};

class CreateRecipeForm extends React.Component {
  constructor(props) {
    super(props);

    this.uploadMainImageRef = React.createRef();
    this.uploadRecipeImagesRef = React.createRef();
  }
  state = {
    form: {
      name: '',
      preparationTime: '',
      cookingTime: [],
      difficulty: '',
      steps: [],
      measureSystem: RecipeStore.getRecipesState().measureSystems.find(system => system.name === 'metric'),
      selectedIngredients: [],
      comments: '',
      images: []
    },
    ingredients: RecipeStore.getRecipesState().ingredients,
    measureSystems: RecipeStore.getRecipesState().measureSystems,
    order_index: 0
  }

  _onChange = () => {
    const form = { ...this.state.form };
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

    let stepsArray = this.state.form.steps.map(step => {
      return Object.entries({ [`step${step.step}`]: step.value });
    });


    const form = { ...this.state.form };
    form.selectedIngredients = ingredientsArray;
    form.steps = stepsArray.flat().flat().join('-');
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

  onChangeHandler = (ev, image_type, step=null) => {
    let imageObject = { file: ev.target.files[0] , image_type, order_index: this.state.order_index, step: step };

    switch(image_type) {
      case 'main_image':
        const main_image_index = this.state.form.images.findIndex(image => image.image_type === 'main_image');
        if (main_image_index > 0) this.state.form.images.splice(main_image_index, 1, imageObject);
        else this.state.form.images.push(imageObject);
        break;
      default:
        this.state.form.images.push(imageObject);
        break;
    }

    this.setState({ order_index: this.state.order_index + 1 });
  }

  deleteUploadedImage = (image_type) => {
    switch(image_type) {
      case 'main_image':
        const main_image_index = this.state.form.images.findIndex(image => image.image_type === 'main_image');
        let form = { ...this.state.form };
        form.images.splice(main_image_index, 1);
        this.setState({ form });
        break;
      default:
        break;
    }
  }

  displayMainImage = () => {
    const main_image_index = this.state.form.images.findIndex(image => image.image_type === 'main_image');
    if (main_image_index >= 0) {
      return (
        <div className='upload-recipe-main-image-preview-div'>
          <img
            className='upload-recipe-main-image-preview'
            src={URL.createObjectURL(this.state.form.images[main_image_index].file) }
            onClick={ () => this.deleteUploadedImage('main_image') }
          ></img>
        </div>
      );
    }

    return (
      <div className='label-wrapper-upload-image'>
        <label className='label-upload-image'>Main recipe image</label>
      </div>
    );
  }

  displayRecipeImages = () => {
    const recipe_images = this.state.form.images.filter(image => image.image_type === 'recipe_images');
    const settings = {
      visibleSlides: 3,
      totalSlides: recipe_images.length,
      step: 3,
      dragStep: 1,
      naturalSlideWidth: 400,
      naturalSlideHeight: 500
    };

    if (recipe_images.length > 0) {
      return (
        <Carousel settings={ settings } >
          { recipe_images.map((image, index) => {
              return (
                <div key={ index } className='upload-recipe-images-preview-div'>
                  <img className='upload-recipe-images-preview' src={ URL.createObjectURL(image.file) }></img>
                </div>
              )
          }) }
        </Carousel>
      );
    }

    return (
      <div className='label-wrapper-upload-image'>
        <label className='label-upload-image'>Add more photos to your recipe's image gallery</label>
      </div>
    );
  }

  stepPreviewImages = () => {
    if (this.state.form.images.length > 0) {
      return this.state.form.images.filter(image => image.image_type === 'steps_image');
    }

    return [];
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
            <div className='create-recipe-form-row-2-columns'>
              <div className='create-recipe-form-row-item-wrapper'>
                <div className='create-recipe-form-row-name'>
                  <div className='label-wrapper-2-columns'>
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
                  <div className='label-wrapper-2-columns'>
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

            <div className='create-recipe-form-row-2-columns'>
              <div className='create-recipe-form-row-item-wrapper'>
                <div className='create-recipe-form-row-name'>
                  <div className='label-wrapper-2-columns'>
                    <label className='label'>Preparation Time</label>
                  </div>
                  <Input
                    className='name-text-input'
                    placeholder='Preparation Time'
                    name='preparationTime'
                    type='number'
                    min={ 0 }
                    label={ { tag: false, content: 'minutes' } }
                    labelPosition='right'
                    onChange={ this.handleTextFieldChange }
                  />
                </div>
              </div>

              <div className='create-recipe-form-row-item-wrapper'>
                <div className='create-recipe-form-row-name'>
                  <div className='label-wrapper-2-columns'>
                    <label className='label'>Cooking Time</label>
                  </div>
                  <Input
                    className='name-text-input'
                    placeholder='Cooking Time'
                    name='cookingTime'
                    type='number'
                    min={ 0 }
                    label={ { tag: false, content: 'minutes' } }
                    labelPosition='right'
                    onChange={ this.handleTextFieldChange }
                  />
                </div>
              </div>
            </div>

            <div className='create-recipe-form-row-2-columns'>
              <div className='create-recipe-form-row-item-wrapper'>
                <div className='create-recipe-form-row-name'>
                  <div className='label-wrapper-2-columns'>
                    <label className='label'>Measurement System</label>
                  </div>
                  <Dropdown
                    placeholder='Measurement System'
                    name='measureSystem'
                    fluid
                    selection
                    options={ this.formatMeasureSystems() }
                    onChange={ this.handleMeasurementSystemChange }
                  />
                </div>
              </div>

              { this.renderInvisibleColumn() }
            </div>

            <div className='create-recipe-form-row-1-column'>
              <div className='create-recipe-form-row-wrapper'>
                <RecipeIngredientsWrapper
                  updateIngredientValues={ this.handleUpdateIngredientValues }
                  ingredients={ this.state.ingredients }
                  measureSystem={ this.state.form.measureSystem }
                />
              </div>
            </div>

            <div className='create-recipe-form-row-1-column'>
              <div className='create-recipe-form-row-wrapper'>
                <RecipeStepsWrapper
                  updateStepValues={ this.handleUpdateStepValues }
                  handleStepsImageUpload={ this.onChangeHandler }
                  previewUploadImages={ this.stepPreviewImages() }
                />
              </div>
            </div>

            <div className='create-recipe-form-row-1-column'>
              <div className='create-recipe-form-row-wrapper'>
                <div className='label-wrapper-1-column'>
                  <label className='label'>Comments</label>
                </div>
                <textarea
                  className='create-recipe-form-row-comments-textarea'
                  name='comments'
                  onChange={ this.handleTextFieldChange }
                  value={ this.state.form.comments }
                >
                </textarea>
              </div>
            </div>

            <div className='create-recipe-form-row-1-column'>
              <div className='create-recipe-form-row-wrapper'>
                <div className='upload-recipe-images-wrapper'>
                  <div className='upload-recipe-images-button-wrapper'>
                    <Button
                      className='upload-recipe-images-button'
                      name='upload-main-image'
                      onClick={ () => this.uploadMainImageRef.current.click() }
                    >
                      <Icon name='upload' size='large' className='upload-recipe-images-icon' />
                    </Button>
                  </div>

                  <div className='upload-recipe-images-preview-wrapper'>
                    { this.displayMainImage() }
                  </div>
                </div>
              </div>
            </div>

            <div className='create-recipe-form-row-1-column'>
              <div className='create-recipe-form-row-wrapper'>
                <div className='upload-recipe-images-wrapper'>
                  <div className='upload-recipe-images-button-wrapper'>
                    <Button
                      className='upload-recipe-images-button'
                      name='upload-recipe-images'
                      onClick={ () => this.uploadRecipeImagesRef.current.click() }
                    >
                      <Icon name='upload' size='large' className='upload-recipe-images-icon' />
                    </Button>
                  </div>

                  <div className='upload-recipe-images-preview-wrapper'>
                    { this.displayRecipeImages() }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="file" hidden onChange={ ev => this.onChangeHandler(ev, 'main_image') } ref={ this.uploadMainImageRef }/>
          <input type="file" multiple hidden onChange={ ev => this.onChangeHandler(ev, 'recipe_images') } ref={ this.uploadRecipeImagesRef }/>
        </Form>
      </div>
    );
  }
}

CreateRecipeForm.propTypes = propTypes;
export default CreateRecipeForm;
