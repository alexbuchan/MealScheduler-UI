require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './ActionDispatch';
import ActionsHelper from '../ActionsHelper';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ServiceConfig from '../../services/config';

class ScheduleActions {
  getSchedule = async (schedule) => {
    const _endpoint = `${ServiceConfig}/scheduler`;
    const jwt = ActionsHelper.getCookie('user');

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.post(_endpoint, { scheduler: schedule }, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      ActionDispatch.dispatchScheduleData(response.data);
    }
  }
}

export default new ScheduleActions();