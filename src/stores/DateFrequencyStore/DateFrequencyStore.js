import Store from '../Store/Store';
import Constants from '../../constants/dateFrequencyConstants';

class DateFrequencyStore extends Store {
  constructor() {
    super();

    this.dateFrequenciesState = {
      dateFrequencies: []
    };
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Constants.GET_DATE_FREQUENCIES:
        this.getDateFrequencies(action.data);
        break;
    }
  }

  getDateFrequencies = (data) => {
    this.dateFrequenciesState.dateFrequencies = data;
    this.emitChange();
  }

  getDateFrequenciesState = () => {
    return this.dateFrequenciesState;
  }
}

export default new DateFrequencyStore();