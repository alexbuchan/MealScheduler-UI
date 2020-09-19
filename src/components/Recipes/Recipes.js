import React from 'react';
import PropTypes from 'prop-types';
import translations from './translations.json';
import { translate } from '../../lib/i18n/i18n';
let t = translate(translations);

// IMPORT COMPONENTS
import RecipesContainer from '../../components/RecipesContainer/RecipesContainer';
import Modal from '../../components/Modal/Modal';
import CreateRecipeForm from '../../components/CreateRecipeForm/CreateRecipeForm';
import { Dropdown, Input } from 'semantic-ui-react';

// IMPORT ICONS
import AddButton from '../../assets/images/svg/plus.svg';

const propTypes = {
  recipes: PropTypes.array
};

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredRecipes: this.props.recipes,
      openModal: false,
      recipeSearchType: 'name'
    }

    this.t = t(this.props.locale);
    this.handleRecipeSearch = this.handleRecipeSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipes !== this.props.recipes) {
      this.setState({ filteredRecipes: this.props.recipes });
    }
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

  handleRecipeSearchType = (_, { value }) => {
    this.setState({ recipeSearchType: value });
  }

  handleRecipeSearch = (_, { value }) => {
    const recipes = this.props.recipes.filter(recipe => {
      switch (this.state.recipeSearchType) {
        case 'name':
        case 'difficulty':
        case 'measure_system':
          return recipe[this.state.recipeSearchType].toLowerCase().includes(value.toLowerCase());
        case 'preparation_time':
        case 'cooking_time':
          if (value !== '') return recipe[this.state.recipeSearchType] === parseInt(value);
        default:
          return this.props.recipes;
      }
    });

    this.setState({ filteredRecipes: recipes });
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
    this.t = t(this.props.locale);

    return (
      <div className='recipes-body-wrapper'>
        <div className='recipes-body'>
          <h1 className='recipes-title'>{ this.t('recipes_view.title') }</h1>
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
    );
  }
}

Recipes.propTypes = propTypes;
export default Recipes;