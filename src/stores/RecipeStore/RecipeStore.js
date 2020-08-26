import Store from '../Store/Store';
import Constants from '../../constants/recipeConstants';

class RecipeStore extends Store {
  constructor() {
    super();

    this.recipesState = {
      recipes: []
    };
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Constants.GET_RECIPES:
        this.getRecipesData(action.data);
        break;
    }
  }

  getRecipesData = (data) => {
    this.recipesState.recipes = data;
    this.emitChange();
  }

  getRecipesState = () => {
    return this.recipesState;
  }
}

export default new RecipeStore();