import Store from '../Store/Store';
import Constants from '../../constants/flashMessageConstants';

let flashMessageState = {
  message: null,
  open: false,
  type: null,
  duration: 3000
};

class FlashMessageStore extends Store {
  constructor() {
    super();
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Constants.DISPATCH_ERROR_MESSAGE:
        this.addErrorMessage(action.data);
        break;

      case Constants.DISPATCH_SUCCESS_MESSAGE:
        this.addSuccessMessage(action.data);
        break;

      case Constants.CLOSE_FLASH_MESSAGE:
        this.closeFlashMessage();
        break;
    }
  }

  addErrorMessage = (error) => {
    flashMessageState.message = (Array.isArray(error.data.errors)) ? error.data.errors : [error.data.errors]
    flashMessageState.open = true;
    flashMessageState.type = 'error';

    this.emitChange();
  }

  addSuccessMessage = (data) => {
    flashMessageState.message = [data.message];
    flashMessageState.open = true;
    flashMessageState.type = 'success';

    this.emitChange();
  }

  closeFlashMessage = () => {
    flashMessageState.open = false;
    this.emitChange();
  }

  getFlashMessageState = () => {
    return flashMessageState;
  }

  getMessage = () => {
    return flashMessageState.message;
  }

  getOpen = () => {
    return flashMessageState.open;
  }

  getType = () => {
    return flashMessageState.type;
  }

  getDuration = () => {
    return flashMessageState.duration;
  }
}

export default new FlashMessageStore();