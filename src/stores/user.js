import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/userConstants';

const CHANGE = 'CHANGE';
let userState = {};

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
          this.loginUser(action.response);
          break;

        case Constants.LOGIN_USER:
          this.loginUser(action.response);
          break;
        
        case Constants.LOGOUT_USER:
          this.logoutUser(action.response);
          break;
      }
    }

    // Adds a new item to the list and emits a CHANGED event.
    loginUser(response) {
      userState.user = response.user;
      userState.auth = response.auth;
      userState.token = response.token;
      userState.message = response.message;
      this.emit(CHANGE);
    }

    logoutUser = (response) => {
      userState.auth = response.auth;
      userState.token = '';
      userState.message = response.message;
      this.emit(CHANGE);
    }

    getUserState() {
      return userState;
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
