import React from 'react';
import PropTypes from 'prop-types';

// IMPORT ACTIONS
import Actions from '../../actions/recipe/RecipeActions';

// IMPORT STORES
import Store from '../../stores/RecipeStore/RecipeStore';

// IMPORT COMPONENTS
import Background from '../../components/Background/Background';
import Recipes from '../../components/Recipes/Recipes';

const propTypes = {
  appState: PropTypes.shape({
    locale: PropTypes.string,
    locales: PropTypes.array
  })
};

class RecipesView extends React.Component {
  constructor() {
    super();

    this.loadingTime = 100;
    this.state = {
      isLoading: true,
      recipes: [...Store.getRecipesState().recipes]
    }
  }

  _onChange = () => {
    this.setState({
      recipes: Store.getRecipesState().recipes,
      filteredRecipes: [...Store.getRecipesState().recipes]
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      Actions
        .getRecipes()
        .then(() => {
          this.setState({ isLoading: false });
        });
    });

    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }


  handleDeleteRecipe = (recipe_id) => {
    Actions.deleteRecipe(recipe_id);
  }

  render() {
    return (
      <div className="recipes-view">
        <Background />
        <Recipes isLoading={ this.state.isLoading } recipes={ this.state.recipes } locale={ this.props.props.locale } handleDeleteRecipe={ this.handleDeleteRecipe }/>
      </div>
    );
  }
}

RecipesView.propTypes = propTypes;
export default RecipesView;