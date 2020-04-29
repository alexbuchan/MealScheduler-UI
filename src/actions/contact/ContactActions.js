require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './ActionDispatch';
import ActionsHelper from '../ActionsHelper';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';

class ContactActions {
  getContacts = async () => {
    const _endpoint = 'http://localhost:3000/contacts';
    const jwt = ActionsHelper.getCookie('user');

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.get(_endpoint, { headers: { Authorization: `Bearer ${jwt}` }})
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      ActionDispatch.dispatchContactsData(response.data);
    }
  }
}

export default new ContactActions();