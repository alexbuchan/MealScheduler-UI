import React from 'react';
import PropTypes from 'prop-types';

// IMPORT ACTIONS
import Actions from '../../actions/recipe/RecipeActions';

// IMPORT STORES
import Store from '../../stores/RecipeStore/RecipeStore';

// IMPORT HOCS
import withLoader from '../../HOC/Loader/Loader';

// IMPORT COMPONENTS
import Background from '../../components/Background/Background';
import Modal from '../../components/Modal/Modal';
import RecipesContainer from '../../components/RecipesContainer/RecipesContainer';
import CreateRecipeForm from '../../components/CreateRecipeForm/CreateRecipeForm';
import { Dropdown, Input } from 'semantic-ui-react';

// IMPORT HELPERS
import { modulo } from '../../lib/Helpers/helpers';
import AddButton from '../../assets/images/svg/plus.svg';

const propTypes = {};

class RecipesView extends React.Component {
  constructor() {
    super();

    this.loadingTime = 500;
    this.state = {
      isLoading: false,
      recipes: [...Store.getRecipesState().recipes],
      filteredRecipes: [...Store.getRecipesState().recipes],
      openModal: false,
      recipeSearchType: 'name'
    }
    this.handleRecipeSearch = this.handleRecipeSearch.bind(this);
  }

  _onChange = () => {
    this.setState({
      recipes: Store.getRecipesState().recipes,
      filteredRecipes: [...Store.getRecipesState().recipes]
    });
  }

  componentDidMount() {
    Actions.getRecipes();
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  searchOptions = () => {
    return [
      { value: 'name', text: 'name' },
      { value: 'difficulty', text: 'difficulty' },
      { value: 'measure_system', text: 'measure_system' },
      { value: 'preparation_time', text: 'preparation_time' },
      { value: 'cooking_time', text: 'cooking_time' }
    ];
  }

  handleRecipeSearch = (_, { value }) => {
    const recipes = this.state.recipes.filter(recipe => {
      switch (this.state.recipeSearchType) {
        case 'name':
        case 'difficulty':
        case 'measure_system':
          return recipe[this.state.recipeSearchType].toLowerCase().includes(value.toLowerCase());
        case 'preparation_time':
        case 'cooking_time':
          if (value !== '') return recipe[this.state.recipeSearchType] === parseInt(value);
        default:
          return this.state.recipes;
      }
    });

    this.setState({ filteredRecipes: recipes });
  }

  handleRecipeSearchType = (_, { value }) => {
    this.setState({ recipeSearchType: value });
  }

  handleOpenModal = (ev) => {
    this.setState({ openModal: true });
  }

  handleCloseModal = (ev) => {
    this.setState({ openModal: false });
  }

  renderModal = () => {
    if (this.state.openModal) {
      return (
        <Modal closeModal={ this.handleCloseModal }>
          <CreateRecipeForm closeModal={ this.handleCloseModal } validate={ true }/>
        </Modal>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="recipes-view">
        <Background />
        <div className='recipes-body-wrapper'>
          <div className='recipes-body'>
            <h1 className='recipes-title'>My Recipes</h1>

            <div className='recipes-navbar-wrapper'>
              <div className='recipes-navbar'>
                <div className='recipes-search-bar'>
                  <Input
                    icon='search'
                    iconPosition='left'
                    placeholder='Search...'
                    label={ <Dropdown defaultValue='name' options={ this.searchOptions() } onChange={ this.handleRecipeSearchType } /> }
                    labelPosition='right'
                    onChange={ this.handleRecipeSearch }
                    className='recipes-search-bar-input'
                  />
                </div>

                <div className='recipes-create-recipe-wrapper'>
                  <div className='recipes-create-recipe'>
                    <p className='recipes-create-recipe-label'>Create Recipe</p>
                    <button className='recipes-create-recipe-button' onClick={ this.handleOpenModal }>
                      <AddButton className='recipes-create-recipe-icon' />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='recipes-list'>
              <RecipesContainer recipes={ this.state.filteredRecipes }/>
            </div>
          </div>

          { this.renderModal() }
        </div>
      </div>
    );
  }
}

RecipesView.propTypes = propTypes;
export default RecipesView;