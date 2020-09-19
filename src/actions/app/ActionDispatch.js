import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/appConstants';

class ActionDispatch {
  dispatchChangeLocale = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.CHANGE_LOCALE,
      data
    });
  }
}

export default new ActionDispatch();