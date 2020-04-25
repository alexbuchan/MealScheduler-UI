import UserStore from './UserStore';
import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/userConstants';

jest.mock('../../dispatcher/dispatcher');

describe('UserStore', () => {
  let callback;

  beforeEach(() => {
    callback = Dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(Dispatcher.register.mock.calls.length).toBe(1);
  });

  it("initializes UserStore with default values", () => {
    const getUserState = UserStore.getUserState();
    expect(getUserState).toEqual({ auth: false, closeFlashMessage: true });
  });

  describe('#registerUser', () => {
    it('adds registered user data to the store', () => {
      const actionMock = {
        actionType: Constants.REGISTER_USER,
        data: {
          user: { username: 'username', email: 'user@email.com' },
          message: 'User registered and logged in.',
          auth: true
        }
      };

      callback(actionMock);
      const getUserState = UserStore.getUserState();
      expect(getUserState.user).toEqual({ username: 'username', email: 'user@email.com' });
      expect(getUserState.message).toEqual('User registered and logged in.');
      expect(getUserState.auth).toEqual(true);
    });
  });

  describe('#loginUser', () => {
    it('adds logged in user data to the store', () => {
      const actionMock = {
        actionType: Constants.LOGIN_USER,
        data: {
          user: { username: 'username', email: 'user@email.com' },
          message: 'User logged in.',
          auth: true
        }
      };

      callback(actionMock);
      const getUserState = UserStore.getUserState();
      expect(getUserState.user).toEqual({ username: 'username', email: 'user@email.com' });
      expect(getUserState.message).toEqual('User logged in.');
      expect(getUserState.auth).toEqual(true);
    });
  });

  describe('#logoutUser', () => {
    it('removes logged out user data from the store', () => {
      const loginActionMock = {
        actionType: Constants.LOGIN_USER,
        data: {
          user: { username: 'username', email: 'user@email.com' },
          message: 'User logged in.',
          auth: true
        }
      };

      const logoutActionMock = {
        actionType: Constants.LOGOUT_USER
      };

      callback(loginActionMock);
      callback(logoutActionMock);
      const getUserState = UserStore.getUserState();
      expect(getUserState.user).toEqual(null);
      expect(getUserState.message).toEqual(null);
      expect(getUserState.auth).toEqual(false);
    });
  });

  describe('#addErrorMessage', () => {
    describe('when receiving a single error message', () => {
      it('wraps error message in array and adds it to the store', () => {
        const actionMock = {
          actionType: Constants.ERROR_MESSAGE,
          err: {
            response: {
              data: {
                error: 'Email or password incorrect.'
              }
            }
          }
        };
  
        callback(actionMock);
        const getUserState = UserStore.getUserState();
        expect(getUserState.error).toEqual(['Email or password incorrect.']);
        expect(getUserState.closeFlashMessage).toEqual(false);
      });
    });

    describe('when receiving multiple error messages', () => {
      it('wraps error messages in array and adds them to the store', () => {
        const actionMock = {
          actionType: Constants.ERROR_MESSAGE,
          err: {
            response: {
              data: {
                error: ['Password must be longer than 6 characters', 'email is invalid']
              }
            }
          }
        };
  
        callback(actionMock);
        const getUserState = UserStore.getUserState();
        expect(getUserState.error).toEqual(['Password must be longer than 6 characters', 'email is invalid']);
        expect(getUserState.closeFlashMessage).toEqual(false);
      });
    });
  });
  
  describe('#closeFlashMessage', () => {
    it('sets closeFlashMessage to true', () => {
      const actionMock = {
        actionType: Constants.CLOSE_FLASH_MESSAGE
      };

      callback(actionMock);
      const getUserState = UserStore.getUserState();
      expect(getUserState.closeFlashMessage).toEqual(true);
    });
  });

  describe('#populateUserDataOnRefresh', () => {
    it('adds logged in user data to the store on refresh', () => {
      const actionMock = {
        actionType: Constants.RETRIEVE_USER_DATA_ON_REFRESH,
        data: {
          user: { username: 'username', email: 'user@email.com' },
          message: 'User logged in.',
          auth: true
        }
      };

      callback(actionMock);
      const getUserState = UserStore.getUserState();
      expect(getUserState.user).toEqual({ username: 'username', email: 'user@email.com' });
      expect(getUserState.message).toEqual('User logged in.');
      expect(getUserState.auth).toEqual(true);
    });
  });
});