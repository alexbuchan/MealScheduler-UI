require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './ActionDispatch';
import ActionsHelper from '../ActionsHelper';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ServiceConfig from '../../services/config';

class DateFrequencyActions {
  getDateFrequencies = async () => {
    const _endpoint = `${ServiceConfig}/date_frequencies`;
    const jwt = ActionsHelper.getCookie('user');

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.get(_endpoint, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      ActionDispatch.dispatchDateFrequenciesData(response.data);
    }
  }
}

export default new DateFrequencyActions();