import Store from '../Store/Store';
import Constants from '../../constants/scheduleConstants';

class ScheduleStore extends Store {
  constructor() {
    super();

    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    this.scheduleState = {
      month: this.getCurrentMonthName(),
      year: this.getCurrentYear(),
      number_of_days: '',
      schedule: []
    };
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Constants.GET_SCHEDULE_DATA:
        this.getScheduleData(action.data);
        break;
    }
  }

  getScheduleData = (data) => {
    this.scheduleState.month = data.month;
    this.scheduleState.year = data.year;
    this.scheduleState.number_of_days = data.number_of_days;
    this.scheduleState.schedule = data.schedule;
    this.emitChange();
  }

  getScheduleState = () => {
    return this.scheduleState;
  }

  getCurrentMonthName = () => {
    return this.monthNames[new Date().getMonth()];
  }

  getCurrentYear = () => {
    return new Date().getFullYear();
  }
}

export default new ScheduleStore();