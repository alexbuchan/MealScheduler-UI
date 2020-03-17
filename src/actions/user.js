import Cookie from 'universal-cookie';
require('es6-promise').polyfill();
const request = require('axios');

import JWT from '../lib/JWT';
import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/userConstants';

class UserActions {
  registerUser = user => {
    const _endpoint = 'http://localhost:3000/signup';
    request.post(_endpoint, user)
      .then(response => {
        if (response.status === 200) {
          const data = JWT.decodeJWTToken(response.data.token);
          const cookie = this.setCookie(data);
          data.cookie = cookie;

          this.dispatchRegisterUser(data);
        }
      })
      .catch(err => {
        this.dispatchErrorMessage(err);
      });
  }

  loginUser = user => {
    const _endpoint = 'http://localhost:3000/login';
    request.post(_endpoint, user)
      .then(response => {
        if (response.status === 200) {
          const data = JWT.decodeJWTToken(response.data.token);
          const cookie = this.setCookie(data);
          data.cookie = cookie;

          this.dispatchLoginUser(data)
        }
      })
      .catch(err => {
        this.dispatchErrorMessage(err);
      });
  }

  logoutUser = user => {
    const _endpoint = 'http://localhost:3000/logout';
    request.post(_endpoint, user)
      .then(response => {
        this.removeCookie();
        this.dispatchLogoutUser(response)  
      })
      .catch(err => {
        this.dispatchErrorMessage(err);
      });
  }

  closeFlashMessage = () => {
    Dispatcher.dispatch({
      actionType: Constants.CLOSE_FLASH_MESSAGE
    });
  }

  dispatchRegisterUser = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.REGISTER_USER,
      data
    });
  }

  dispatchLoginUser = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.LOGIN_USER,
      data
    });
  }

  dispatchLogoutUser = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.LOGOUT_USER,
      data
    });
  }

  dispatchErrorMessage = (err) => {
    Dispatcher.dispatch({
      actionType: Constants.ERROR_MESSAGE,
      err
    });
  }

  setCookie = user => {
    const cookie = new Cookie();
    cookie.set('user', user, { path: '/' });
    return cookie.get('user');
  }

  removeCookie = () => {
    const cookie = new Cookie();
    cookie.remove('user');
  }
}

export default new UserActions();
