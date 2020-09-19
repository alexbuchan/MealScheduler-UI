require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './ActionDispatch';
import ActionsHelper from '../ActionsHelper';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ServiceConfig from '../../services/config';

class RecipeActions {
  changeLocale = (locale) => {
    ActionDispatch.dispatchChangeLocale(locale);
  }
}

export default new RecipeActions();
