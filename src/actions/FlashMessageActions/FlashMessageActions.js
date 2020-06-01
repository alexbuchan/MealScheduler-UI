require('es6-promise').polyfill();

import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/flashMessageConstants';

class FlashMessageActions {
  dispatchErrorMessage = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.DISPATCH_ERROR_MESSAGE,
      data
    });
  }

  dispatchSuccessMessage = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.DISPATCH_SUCCESS_MESSAGE,
      data
    });
  }

  closeFlashMessage = () => {
    Dispatcher.dispatch({
      actionType: Constants.CLOSE_FLASH_MESSAGE
    });
  }
}

export default new FlashMessageActions();