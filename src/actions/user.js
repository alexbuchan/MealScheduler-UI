import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/userConstants';
const request = require('superagent');


class UserActions {
  createUser(user) {
    debugger;
    const _endpoint = 'http://localhost:3000/signup';
    request.post(_endpoint, user)
      .then(response => {
        Dispatcher.dispatch({
          actionType: Constants.CREATE_USER,
          response: response.body
        });
      })
      .catch(err => err);
  }
}

export default new UserActions();
