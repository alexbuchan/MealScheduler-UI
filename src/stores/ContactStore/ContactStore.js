import Store from '../Store/Store';
import Constants from '../../constants/contactConstants';

let contactState = {
  contacts: []
};

class ContactStore extends Store {
  constructor() {
    super();
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
    this.emitChange();
  }

  getContactState = () => {
    return contactState;
  }
}

export default new ContactStore();