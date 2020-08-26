import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/eventTypeConstants';

class ActionDispatch {
  dispatchEventTypesData = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.GET_EVENT_TYPES,
      data
    });
  }
}

export default new ActionDispatch();