import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/userConstants';
import Cookie from 'universal-cookie';

const CHANGE = 'CHANGE';
const cookie = new Cookie;
let userState = {
  cookie: cookie.get('user') || null,
  closeFlashMessage: true
};

class UserStore extends EventEmitter {
  constructor() {
    super();
    // Registers action handler with the Dispatcher.
    Dispatcher.register(this._registerToActions.bind(this));
  }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {
      switch(action.actionType) {
        case Constants.REGISTER_USER:
          this.loginUser(action.data);
          break;

        case Constants.LOGIN_USER:
          this.loginUser(action.data);
          break;
        
        case Constants.LOGOUT_USER:
          this.logoutUser(action.data);
          break;

        case Constants.ERROR_MESSAGE:
          this.addErrorMessage(action.err.response);
          break;

        case Constants.CLOSE_FLASH_MESSAGE:
          this.closeFlashMessage();
          break;
      }
    }

    // Adds a new item to the list and emits a CHANGED event.
    loginUser(data) {
      userState.cookie = data.cookie;
      userState.auth = data.auth;
      userState.user = data.user;
      userState.message = data.message;

      this.emit(CHANGE);
    }

    logoutUser = (data) => {
      userState.auth = data.auth;
      userState.message = data.message;
      userState.cookie = null;
      this.emit(CHANGE);
    }

    getUserState() {
      return userState;
    }

    getError() {
      return userState.error;
    }

    addErrorMessage(err) {
      userState.error = (Array.isArray(err.data.error)) ? err.data.error : [err.data.error];
      userState.closeFlashMessage = false;

      this.emit(CHANGE);
    }

    closeFlashMessage() {
      userState.closeFlashMessage = true;
      this.emit(CHANGE);
    }

    getCloseFlashMessage() {
      return userState.closeFlashMessage;
    }

    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(CHANGE, callback);
    }

    // Removes the listener from the CHANGED event.
    removeChangeListener(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new UserStore();
