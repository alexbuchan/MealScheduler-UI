import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/userConstants';

class ActionDispatch {
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

  dispatchLogoutUser = () => {
    Dispatcher.dispatch({
      actionType: Constants.LOGOUT_USER
    });
  }

  dispatchErrorMessage = (err) => {
    Dispatcher.dispatch({
      actionType: Constants.ERROR_MESSAGE,
      err
    });
  }

  dispatchUserDataOnRefresh = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.RETRIEVE_USER_DATA_ON_REFRESH,
      data
    });
  }
}

export default new ActionDispatch();