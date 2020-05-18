require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './ActionDispatch';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ActionsHelper from '../ActionsHelper';
import JWT from '../../lib/JWT/JWT';

class UserActions {
  registerUser = async user => {
    const _endpoint = 'http://localhost:3000/signup';

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.post(_endpoint, user)
    );
    
    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      this.handleSignupLoginResponse(response, ActionDispatch.dispatchRegisterUser);
    }
  }

  loginUser = async user => {
    const _endpoint = 'http://localhost:3000/login';

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.post(_endpoint, user)
    );
    
    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      this.handleSignupLoginResponse(response, ActionDispatch.dispatchLoginUser);
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

  handleSignupLoginResponse = (response, dispatchFunction) => {
    if (response.status === 200) {
      const data = JWT.decodeJWTToken(response.data.token);
      ActionsHelper.setCookie('user', response.data.token);

      dispatchFunction(data);
    }
  }
}

export default new UserActions();
