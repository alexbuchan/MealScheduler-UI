import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/userConstants';
import ActionDispatch from './ActionDispatch';

jest.mock('../../dispatcher/dispatcher');

describe('ActionDispatch', () => {
  describe('#dispatchRegisterUser', () => {
    it('registers user with API', async () => {  
      const data = { username: 'username', email: 'user@email.com', password: 'password' };
 
      ActionDispatch.dispatchRegisterUser(data);
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.REGISTER_USER,
        data
      });
    });
  });

  describe('#dispatchLoginUser', () => {
    it('logs user in with API', async () => {  
      const data = { email: 'user@email.com', password: 'password' };
 
      ActionDispatch.dispatchLoginUser(data);
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.LOGIN_USER,
        data
      });
    });
  });

  describe('#dispatchLogoutUser', () => {
    it('logs user out', async () => {   
      ActionDispatch.dispatchLogoutUser();
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.LOGOUT_USER
      });
    });
  });

  describe('#dispatchUserDataOnRefresh', () => {
    it('dispatches data from user browser cookie', async () => {  
      const data = { username: 'username', email: 'user@email.com'};
 
      ActionDispatch.dispatchUserDataOnRefresh(data);
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.RETRIEVE_USER_DATA_ON_REFRESH,
        data
      });
    });
  });
});