require('es6-promise').polyfill();
const request = require('axios');

import Dispatcher from '../../dispatcher/dispatcher';
import ActionDispatch from './actionDispatch';
import Constants from '../../constants/userConstants';
import ActionsHelper from '../actionsHelper';
import JWT from '../../lib/JWT';

class UserActions {
  registerUser = user => {
    const _endpoint = 'http://localhost:3000/signup';
    request.post(_endpoint, user)
      .then(response => {
        this.handleSignupLoginResponse(response, ActionDispatch.dispatchRegisterUser);
      })
      .catch(err => {
        ActionDispatch.dispatchErrorMessage(err);
      });
  }

  loginUser = user => {
    const _endpoint = 'http://localhost:3000/login';
    request.post(_endpoint, user)
      .then(response => {
        this.handleSignupLoginResponse(response, ActionDispatch.dispatchLoginUser);
      })
      .catch(err => {
        ActionDispatch.dispatchErrorMessage(err);
      });
  }

  logoutUser = () => {
    ActionsHelper.removeCookie();
    ActionDispatch.dispatchLogoutUser();
  }

  closeFlashMessage = () => {
    Dispatcher.dispatch({
      actionType: Constants.CLOSE_FLASH_MESSAGE
    });
  }

  retrieveUserDataOnRefresh = () => {
    const cookie = ActionsHelper.getCookie('user');
    if (cookie) {
      const data = JWT.decodeJWTToken(cookie);
      ActionDispatch.dispatchUserDataOnRefresh(data);
    }
  }

  handleSignupLoginResponse = (response, dispatchFunction) => {
    if (response.status === 200) {
      const data = JWT.decodeJWTToken(response.data.token);
      ActionsHelper.setCookie('user', response.data.token);

      dispatchFunction(data);
    }
  }
}

export default new UserActions();
