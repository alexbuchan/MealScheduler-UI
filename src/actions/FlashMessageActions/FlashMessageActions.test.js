import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/flashMessageConstants';
import Actions from './FlashMessageActions';

jest.mock('../../dispatcher/dispatcher');

describe('FlashMessageActions', () => {
  describe('#dispatchErrorMessage', () => {
    it('dispatches error message to FlashMessageStore', async () => {  
      const errorResponse = {
        data: {
          error: 'Email or password incorrect.'
        }
      }
      
      Actions.dispatchErrorMessage(errorResponse);
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.DISPATCH_ERROR_MESSAGE,
        data: errorResponse
      });
    });
  });

  describe('#closeFlashMessage', () => {
    it('dispatches the action to close the FlashMessage Component', async () => {   
      Actions.closeFlashMessage();
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.CLOSE_FLASH_MESSAGE
      });
    });
  });
});