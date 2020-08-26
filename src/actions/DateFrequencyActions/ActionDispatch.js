import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/dateFrequencyConstants';

class ActionDispatch {
  dispatchDateFrequenciesData = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.GET_DATE_FREQUENCIES,
      data
    });
  }
}

export default new ActionDispatch();