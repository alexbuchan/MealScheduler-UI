import ActionsHelper from "./ActionsHelper";
import UserActionDispatch from './user/ActionDispatch';
import JWT from '../lib/JWT/JWT';

describe('#handleTokenResponse', () => {
  describe('when status 200', () => {
    it('decode JWT, set user cookie, and dispatch data to UserStore', () => {
      const response = {
        status: 200, 
        data: { token: 'fbjdsbfs.fbsdfbisdfbdsjbf.fgydsbfbd' } 
      };

      const data = { username: 'username', email: 'user@email.com' };

      const decodeJWTTokenSpy = jest.spyOn(JWT, 'decodeJWTToken');
      decodeJWTTokenSpy.mockImplementation(jwt => data);

      const dispatchRegisterUserSpy = jest.spyOn(UserActionDispatch, 'dispatchRegisterUser');

      ActionsHelper.handleTokenResponse(response, dispatchRegisterUserSpy);

      expect(dispatchRegisterUserSpy).toHaveBeenCalledWith(data)
    });
  });
});