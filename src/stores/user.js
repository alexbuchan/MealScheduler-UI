import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/userConstants';

const CHANGE = 'CHANGE';
let _userState = [];

class UserStore extends EventEmitter {
  constructor() {
    super();
    // Registers action handler with the Dispatcher.
    Dispatcher.register(this._registerToActions.bind(this));
  }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {
      switch(action.actionType) {
        case ActionTypes.CREATE_USER:
          this._createUser(action.payload);
          break;
      }
    }

    // Adds a new item to the list and emits a CHANGED event.
    _createUser(user) {
        _userState.push(user);
        this.emit(CHANGE);
    }

    _getUser() {
      return _userState[0];
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
