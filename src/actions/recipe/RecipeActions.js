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

  getRecipeWithId = async (id) => {
    const _endpoint = `${ServiceConfig}/recipes/${id}`;
    const jwt = ActionsHelper.getCookie('user');

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.get(_endpoint, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      ActionDispatch.dispatchRecipeWithIdData(response.data);
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
      this.uploadRecipeImages(recipe.images, response.data.recipe_id);
    }
  }

  deleteRecipe = async (recipe_id) => {
    const _endpoint = `${ServiceConfig}/recipes/${recipe_id}`;
    const jwt = ActionsHelper.getCookie('user');

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.delete(_endpoint, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      FlashMessageActions.dispatchSuccessMessage(response.data);
      this.getRecipes();
      this.uploadRecipeImages(recipe.images, response.data.recipe_id);
    }
  }

  uploadRecipeImages = async (images_files, recipe_id) => {
    const _endpoint = `${ServiceConfig}/recipes/recipe_images_upload`;
    const jwt = ActionsHelper.getCookie('user');

    const images = new FormData();

    images_files.forEach((file, index) => {
      images.append(`file_${index}_file`, file.file);
      images.append(`file_${index}_image_type`, file.image_type);
      images.append(`file_${index}_order_index`, file.order_index);
      images.append(`file_${index}_step`, file.step);
    });

    images.append('recipe_id', recipe_id);
    images.append('images_quantity', images_files.length)

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.post(_endpoint, images, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    }
  }
}

export default new RecipeActions();
