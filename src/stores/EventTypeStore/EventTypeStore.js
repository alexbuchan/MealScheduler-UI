import Store from '../Store/Store';
import Constants from '../../constants/eventTypeConstants';

class EventTypeStore extends Store {
  constructor() {
    super();

    this.eventTypesState = {
      eventTypes: []
    };
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Constants.GET_EVENT_TYPES:
        this.getEventTypes(action.data);
        break;
    }
  }

  getEventTypes = (data) => {
    this.eventTypesState.eventTypes = data;
    this.emitChange();
  }

  getEventTypesState = () => {
    return this.eventTypesState;
  }
}

export default new EventTypeStore();