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
import Recipes from '../../components/Recipes/Recipes';

const propTypes = {};

class RecipesView extends React.Component {
  constructor() {
    super();

    this.loadingTime = 500;
    this.state = {
      isLoading: false,
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
      Actions.getRecipes();
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, this.loadingTime);
    });

    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  render() {
    const RecipesWithLoader = withLoader(Recipes);
    return (
      <div className="recipes-view">
        <Background />
        <RecipesWithLoader isLoading={ this.state.isLoading } recipes={ this.state.recipes }/>
      </div>
    );
  }
}

RecipesView.propTypes = propTypes;
export default RecipesView;