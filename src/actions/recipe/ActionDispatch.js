import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/recipeConstants';

class ActionDispatch {
  dispatchRecipeData = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.GET_RECIPES,
      data
    });
  }

  dispatchRecipeWithIdData = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.GET_RECIPE_WITH_ID,
      data
    });
  }
}

export default new ActionDispatch();