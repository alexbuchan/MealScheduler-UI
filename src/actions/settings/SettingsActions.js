require('es6-promise').polyfill();
const request = require('axios');
import JWT from '../../lib/JWT/JWT';

import ActionDispatch from '../user/ActionDispatch';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ActionsHelper from '../ActionsHelper';

class SettingsActions {
  updateUserSettings = async settings => {
    const jwt = ActionsHelper.getCookie('user');
    const currentUserID = JWT.decodeJWTToken(jwt).user.user_id;
    const _endpoint = `http://localhost:3000/users/${currentUserID}`;

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.put(_endpoint, settings, { headers: { Authorization: `Bearer ${jwt}` } })
    );
    
    // error = {
    //   response: {
    //     data: {
    //       error: 'stub'
    //     }
    //   }
    // }

    error = undefined;

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      //FlashMessageActions.dispatchSuccessMessage(response.data.message);
      ActionsHelper.handleTokenResponse(response, ActionDispatch.dispatchRegisterUser);
    }
  }
}

export default new SettingsActions();
