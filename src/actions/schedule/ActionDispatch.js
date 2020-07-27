import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/scheduleConstants';

class ActionDispatch {
  dispatchScheduleData = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.GET_SCHEDULE_DATA,
      data
    });
  }
}

export default new ActionDispatch();