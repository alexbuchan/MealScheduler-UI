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

  getIngredients = async () => {
    console.log('Not implemented');
  }

  getMeasureSystems = async () => {
    console.log('Not implemented');
  }

  createRecipe = async (recipe) => {
    const _endpoint = `${ServiceConfig}/recipes`;
    const jwt = ActionsHelper.getCookie('user');

    const recipePayload = {
      name: recipe.name,
      difficulty: recipe.difficulty,
      preparation_time: parseInt(recipe.preparationTime),
      cooking_time: parseInt(recipe.cookingTime),
      measure_system_id: recipe.measureSystem.id,
      recipe_ingredients_attributes: recipe.selectedIngredients,
      steps: recipe.steps,
      comments: recipe.comments
    };

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.post(_endpoint, recipePayload, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      FlashMessageActions.dispatchSuccessMessage(response.data);
      this.getRecipes();
    }
  }
}

export default new RecipeActions();
