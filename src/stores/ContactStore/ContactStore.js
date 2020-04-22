import { EventEmitter } from 'events';
import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/contactConstants';

const CHANGE = 'CHANGE';
let contactState = {
  contacts: []
};

class ContactStore extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this._registerToActions.bind(this));
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Constants.GET_CONTACTS_DATA:
        this.getContactsData(action.data);
        break;
    }
  }

  getContactsData = (data) => {
    contactState.contacts = data;
    this.emit(CHANGE);
  }

  getContactState = () => {
    return contactState;
  }

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }
}

export default new ContactStore();