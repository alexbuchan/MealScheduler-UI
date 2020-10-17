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

// IMPORT HOCS
import withLoader from '../../HOC/Loader/Loader';

// IMPORT ICONS
import AddButton from '../../assets/images/svg/plus.svg';

const propTypes = {
  recipes: PropTypes.array,
  locale: PropTypes.string,
  isLoading: PropTypes.bool,
  handleDeleteRecipe: PropTypes.func
};

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredRecipes: this.props.recipes,
      openModal: false,
      recipeSearchType: 'name',
      deleting: false,
      deletingRecipeId: -1
    }

    this.t = t(this.props.locale);
    this.handleRecipeSearch = this.handleRecipeSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipes !== this.props.recipes) {
      this.setState({ filteredRecipes: this.props.recipes, deleting: false });
    }
  }

  searchOptions = () => {
    return [
      { value: 'name', text: this.t('recipes_view.recipes_navbar.searchbar.options.name') },
      { value: 'difficulty', text: this.t('recipes_view.recipes_navbar.searchbar.options.difficulty') },
      { value: 'measure_system', text: this.t('recipes_view.recipes_navbar.searchbar.options.measure_system') },
      { value: 'preparation_time', text: this.t('recipes_view.recipes_navbar.searchbar.options.preparation_time') },
      { value: 'cooking_time', text: this.t('recipes_view.recipes_navbar.searchbar.options.cooking_time') }
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

  renderRecipeDeletingLoader = () => {
    if (this.state.deleting) {
      return (
        <div className='recipe-deleting-loader-wrapper'>
          <h3 className='recipe-deleting-loader'></h3>
        </div>
      );
    }

    return null;
  }

  deleteRecipe = (recipe_id) => {
    this.setState({ deleting: true, deletingRecipeId: recipe_id });
    this.props.handleDeleteRecipe(recipe_id);
  }

  render() {
    const RecipesContainerWithLoader = withLoader(RecipesContainer);
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
                  placeholder={ this.t('recipes_view.recipes_navbar.searchbar.placeholder') }
                  label={ <Dropdown defaultValue='name' options={ this.searchOptions() } onChange={ this.handleRecipeSearchType } /> }
                  labelPosition='right'
                  onChange={ this.handleRecipeSearch }
                  className='recipes-search-bar-input'
                />
              </div>

              <div className='recipes-create-recipe-wrapper'>
                <div className='recipes-create-recipe'>
                  <p className='recipes-create-recipe-label'>{ this.t('recipes_view.recipes_navbar.create_recipe') }</p>
                  <button className='recipes-create-recipe-button' onClick={ this.handleOpenModal }>
                    <AddButton className='recipes-create-recipe-icon' />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='recipes-list'>
            { this.renderRecipeDeletingLoader() }
            <RecipesContainerWithLoader isLoading={ this.props.isLoading } deletingRecipeId={ this.state.deletingRecipeId } recipes={ this.state.filteredRecipes } t={ this.t } handleDeleteRecipe={ this.deleteRecipe }/>
          </div>
        </div>
        { this.renderModal() }
      </div>
    );
  }
}

Recipes.propTypes = propTypes;
export default Recipes;