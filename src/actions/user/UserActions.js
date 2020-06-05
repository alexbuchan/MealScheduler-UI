require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './ActionDispatch';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ActionsHelper from '../ActionsHelper';
import JWT from '../../lib/JWT/JWT';
import ServiceConfig from '../../services/config';

class UserActions {
  registerUser = async user => {
    const _endpoint = `${ServiceConfig}/users`;

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.post(_endpoint, user)
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      const data = ActionsHelper.handleTokenResponse(response);
      ActionDispatch.dispatchRegisterUser(data);
    }
  }

  loginUser = async user => {
    const _endpoint = `${ServiceConfig}/auth/login`;

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.post(_endpoint, user)
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      const data = ActionsHelper.handleTokenResponse(response);
      ActionDispatch.dispatchLoginUser(data);
    }
  }

  logoutUser = () => {
    ActionsHelper.removeCookie();
    ActionDispatch.dispatchLogoutUser();
  }

  retrieveUserDataOnRefresh = () => {
    const cookie = ActionsHelper.getCookie('user');
    if (cookie) {
      const data = JWT.decodeJWTToken(cookie);
      ActionDispatch.dispatchUserDataOnRefresh(data);
    }
  }
}

export default new UserActions();
