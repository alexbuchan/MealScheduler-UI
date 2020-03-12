import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/userConstants';
require('es6-promise').polyfill();
const request = require('axios');

class UserActions {
  registerUser(user) {
    const _endpoint = 'http://localhost:3000/signup';
    request.post(_endpoint, user, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      origin: 'localhost',
      credentials: 'include' 
    }) 
      .then(response => {
        if (response.data) {
          Dispatcher.dispatch({
            actionType: Constants.REGISTER_USER,
            response: response.data
          });
        } else {
          console.log('Signup and login error.');
        }
      });
  }

  loginUser(user) {
    const _endpoint = 'http://localhost:3000/login';
    request.post(_endpoint, user)
      .then(response => {
        Dispatcher.dispatch({
          actionType: Constants.LOGIN_USER,
          response: response.data
        });
      })
      .catch(err => err);
  }

  logoutUser(user) {
    const _endpoint = 'http://localhost:3000/logout';
    request.post(_endpoint, user)
      .then(response => {
        Dispatcher.dispatch({
          actionType: Constants.LOGOUT_USER,
          response: response.data
        });
      })
      .catch(err => err);
  }
}

export default new UserActions();
