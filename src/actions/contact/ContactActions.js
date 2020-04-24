require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './ActionDispatch';
import ActionsHelper from '../actionsHelper';

class ContactActions {
  getContacts = async () => {
    const _endpoint = 'http://localhost:3000/contacts';
    const jwt = ActionsHelper.getCookie('user');
    const response = await request.get(_endpoint, { headers: { 'Authorization': `Bearer ${jwt}` } })

    if (response.err) {
      ActionDispatch.dispatchErrorMessage(err);
    }

    ActionDispatch.dispatchContactsData(response.data);
  }
}

export default new ContactActions();