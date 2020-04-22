import { EventEmitter } from 'events';
import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/userConstants';

const CHANGE = 'CHANGE';
let userState = {
  auth: false,
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
          this.registerUser(action.data);
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

        case Constants.RETRIEVE_USER_DATA_ON_REFRESH:
          this.populateUserDataOnRefresh(action.data);
          break;
      }
    }

    // Adds a new item to the list and emits a CHANGED event.
    registerUser = data => {
      this.populateUserData(data);
      this.emit(CHANGE);
    }

    loginUser = data => {

      this.populateUserData(data);
      this.emit(CHANGE);
    }

    populateUserDataOnRefresh = data => {
      this.populateUserData(data);
      this.emit(CHANGE);
    }

    logoutUser = (data) => {
      userState.user = null;
      userState.auth = false;
      userState.message = null;
      this.emit(CHANGE);
    }

    populateUserData = (data) => {
      userState.auth = data.auth;
      userState.user = data.user;
      userState.message = data.message;
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

    getUserState() {
      return userState;
    }

    getError() {
      return userState.error;
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
