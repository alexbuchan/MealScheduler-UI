require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './ActionDispatch';
import ActionsHelper from '../ActionsHelper';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ServiceConfig from '../../services/config';

class RecipeActions {
  getRecipes = async () => {
    const _endpoint = `${ServiceConfig}/recipes`;
    const jwt = ActionsHelper.getCookie('user');

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.get(_endpoint, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      ActionDispatch.dispatchRecipeData(response.data);
    }
  }
}

export default new RecipeActions();