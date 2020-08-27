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

// IMPORT HELPERS
import { modulo } from '../../lib/Helpers/helpers';

const propTypes = {};

class RecipesView extends React.Component {
  constructor() {
    super();

    this.loadingTime = 500;
    this.state = {
      isLoading: false,
      recipes: Store.getRecipesState(),
      openModal: false
    }
  }

  _onChange = () => {
    this.setState({
      recipes: Store.getRecipesState()
    });
  }

  componentDidMount() {
    Actions.getRecipes();
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
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
          <h1>Create Recipe!</h1>
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
          <h1>Recipes View</h1>
        </div>
      </div>
    );
  }
}

RecipesView.propTypes = propTypes;
export default RecipesView;