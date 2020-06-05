require('es6-promise').polyfill();
const request = require('axios');
import JWT from '../../lib/JWT/JWT';

import ActionDispatch from '../user/ActionDispatch';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ActionsHelper from '../ActionsHelper';
import ServiceConfig from '../../services/config';

class SettingsActions {
  updateUserSettings = async settings => {
    const jwt = ActionsHelper.getCookie('user');
    const currentUserID = JWT.decodeJWTToken(jwt).user.user_id;
    const _endpoint = `${ServiceConfig}/users/${currentUserID}`;

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.put(_endpoint, settings, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      const data = ActionsHelper.handleTokenResponse(response);
      ActionDispatch.dispatchRegisterUser(data);
      FlashMessageActions.dispatchSuccessMessage(data);
    }
  }
}

export default new SettingsActions();
