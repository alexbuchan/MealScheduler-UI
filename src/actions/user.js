import Cookie from 'universal-cookie';
require('es6-promise').polyfill();
const request = require('axios');

import Dispatcher from '../dispatcher/dispatcher';
import ActionDispatch from './actionDispatch';
import Constants from '../constants/userConstants';
import JWT from '../lib/JWT';

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
    const jwt = this.getCookie('user');
    request.post(_endpoint, {headers: `Bearer ${jwt}`}, user)
      .then(response => {
        this.handleSignupLoginResponse(response, ActionDispatch.dispatchLoginUser);
      })
      .catch(err => {
        ActionDispatch.dispatchErrorMessage(err);
      });
  }

  logoutUser = () => {
    this.removeCookie();
    ActionDispatch.dispatchLogoutUser();
  }

  closeFlashMessage = () => {
    Dispatcher.dispatch({
      actionType: Constants.CLOSE_FLASH_MESSAGE
    });
  }

  retrieveUserDataOnRefresh = () => {
    const cookie = this.getCookie('user');
    if (cookie) {
      const data = JWT.decodeJWTToken(cookie);
      ActionDispatch.dispatchUserDataOnRefresh(data);
    }
  }

  handleSignupLoginResponse = (response, dispatchFunction) => {
    if (response.status === 200) {
      const data = JWT.decodeJWTToken(response.data.token);
      this.setCookie('user', response.data.token);

      dispatchFunction(data);
    }
  }

  getCookie = (type) => {
    const cookie = new Cookie();
    return cookie.get(type);
  }

  setCookie = (type, token) => {
    const cookie = new Cookie();
    cookie.set(type, token, { path: '/' });
  }

  removeCookie = () => {
    const cookie = new Cookie();
    cookie.remove('user');
  }
}

export default new UserActions();
