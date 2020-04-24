import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/contactConstants';

class ActionDispatch {
  dispatchContactsData = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.GET_CONTACTS_DATA,
      data
    });
  }
}

export default new ActionDispatch();