import Store from '../Store/Store';
import Constants from '../../constants/scheduleConstants';

let scheduleState = {
  month: '',
  year: '',
  number_of_days: '',
  events: []
};

class ScheduleStore extends Store {
  constructor() {
    super();
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Constants.GET_SCHEDULE_DATA:
        this.getScheduleData(action.data);
        break;
    }
  }

  getScheduleData = (data) => {
    scheduleState.month = data.month;
    scheduleState.year = data.year;
    scheduleState.number_of_days = data.number_of_days;
    scheduleState.events = data.events;
    this.emitChange();
  }

  getScheduleState = () => {
    return scheduleState;
  }
}

export default new ScheduleStore();