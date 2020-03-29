require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './actionDispatch';
import ActionsHelper from '../actionsHelper';

class contactActions {
  getContacts = () => {
    const _endpoint = 'http://localhost:3000/contacts';
    const jwt = ActionsHelper.getCookie('user');
    request.get(_endpoint, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        ActionDispatch.dispatchContactsData(response.data);
      })
      .catch(err => {
        ActionDispatch.dispatchErrorMessage(err);
      })
  }
}

export default new contactActions();