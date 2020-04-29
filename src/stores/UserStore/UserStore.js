import Store from '../Store/Store';
import Constants from '../../constants/userConstants';

let userState = {
  auth: false,
  closeFlashMessage: true
};

class UserStore extends Store {
  constructor() {
    super();
  }

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

      case Constants.RETRIEVE_USER_DATA_ON_REFRESH:
        this.populateUserDataOnRefresh(action.data);
        break;
    }
  }

  registerUser = data => {
    this.populateUserData(data);
    this.emitChange();
  }

  loginUser = data => {
    this.populateUserData(data);
    this.emitChange();
  }

  populateUserDataOnRefresh = data => {
    this.populateUserData(data);
    this.emitChange();
  }

  logoutUser = (data) => {
    userState.user = null;
    userState.auth = false;
    userState.message = null;
    this.emitChange();
  }

  populateUserData = (data) => {
    userState.auth = data.auth;
    userState.user = data.user;
    userState.message = data.message;
  }

  getUserState() {
    return userState;
  }
}

export default new UserStore();
