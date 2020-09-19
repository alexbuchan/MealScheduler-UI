import React from 'react';
import PropTypes from 'prop-types';

// IMPORT ACTIONS
import Actions from '../../actions/recipe/RecipeActions';

// IMPORT STORES
import Store from '../../stores/RecipeStore/RecipeStore';

import Recipe from '../../components/Recipe/Recipe';
import Background from '../../components/Background/Background';
import withLoader from '../../HOC/Loader/Loader';

const propTypes = {
  id: PropTypes.string
};

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      ingredientChecked: false,
      recipe: Store.getRecipeWithId()
    };

    this.loadingTime = 500;
  }

  _onChange = () => {
    this.setState({
      recipe: Store.getRecipeWithId()
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      Actions.getRecipeWithId(this.props.id);
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
    let { name } = this.state.recipe;
    const RecipeWithLoader = withLoader(Recipe);

    return (
      <div className="recipe-view">
        <Background />
        <div className='recipe-view-body-wrapper'>
          <div className='recipe-view-body'>
            <h1 className='recipe-view-title'>{ name }</h1>
            <RecipeWithLoader isLoading={ this.state.isLoading } recipe={ this.state.recipe }/>
          </div>
        </div>
      </div>
    );
  }
}

RecipeView.propTypes = propTypes;
export default RecipeView;
