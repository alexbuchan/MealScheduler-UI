import FlashMessageStore from './FlashMessageStore';
import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/flashMessageConstants';

jest.mock('../../dispatcher/dispatcher');

describe('FlashMessageStore', () => {
  let callback;

  beforeEach(() => {
    callback = Dispatcher.register.mock.calls[0][0];
  });

  describe('#addErrorMessage', () => {
    describe('when receiving a single error message', () => {
      it('wraps error message in array and adds it to the store', () => {
        const actionMock = {
          actionType: Constants.DISPATCH_ERROR_MESSAGE,
          data: {
            data: {
              error: 'Email or password incorrect.'
            }
          }
        };
  
        callback(actionMock);
        const flashMessageState = FlashMessageStore.getFlashMessageState();
        expect(flashMessageState.message).toEqual(['Email or password incorrect.']);
        expect(flashMessageState.open).toEqual(true);
      });
    });

    describe('when receiving multiple error messages', () => {
      it('wraps error messages in array and adds them to the store', () => {
        const actionMock = {
          actionType: Constants.DISPATCH_ERROR_MESSAGE,
          data: {
            data: {
              error: ['Password must be longer than 6 characters', 'email is invalid']
            }
          }
        };
  
        callback(actionMock);
        const flashMessageState = FlashMessageStore.getFlashMessageState();
        expect(flashMessageState.message).toEqual(['Password must be longer than 6 characters', 'email is invalid']);
        expect(flashMessageState.open).toEqual(true);
      });
    });
  });
  
  describe('#closeFlashMessage', () => {
    it('sets closeFlashMessage to true', () => {
      const actionMock = {
        actionType: Constants.CLOSE_FLASH_MESSAGE
      };

      callback(actionMock);
      const flashMessageState = FlashMessageStore.getFlashMessageState();
      expect(flashMessageState.open).toEqual(false);
    });
  });

  describe('#getMessage', () => {
    it('gets message attribute from flashMessageState', () => {
      const actionMock = {
        actionType: Constants.DISPATCH_ERROR_MESSAGE,
        data: {
          data: {
            error: 'Email or password incorrect.'
          }
        }
      };

      callback(actionMock);
      const message = FlashMessageStore.getMessage();
      expect(message).toEqual(['Email or password incorrect.']);
    });
  });

  describe('#getOpen', () => {
    it('gets open attribute from flashMessageState', () => {
      const actionMock = {
        actionType: Constants.DISPATCH_ERROR_MESSAGE,
        data: {
          data: {
            error: 'Email or password incorrect.'
          }
        }
      };

      callback(actionMock);
      const open = FlashMessageStore.getOpen();
      expect(open).toEqual(true);
    });
  });

  describe('#getType', () => {
    it('gets type attribute from flashMessageState', () => {
      const actionMock = {
        actionType: Constants.DISPATCH_ERROR_MESSAGE,
        data: {
          data: {
            error: 'Email or password incorrect.'
          }
        }
      };

      callback(actionMock);
      const type = FlashMessageStore.getType();
      expect(type).toEqual('error');
    });
  });

  describe('#getDuration', () => {
    it('gets duration attribute from flashMessageState', () => {
      const actionMock = {
        actionType: Constants.DISPATCH_ERROR_MESSAGE,
        data: {
          data: {
            error: 'Email or password incorrect.'
          }
        }
      };

      callback(actionMock);
      const duration = FlashMessageStore.getDuration();
      expect(duration).toEqual(3000);
    });
  });
});