import ActionsHelper from "./ActionsHelper";
import UserActionDispatch from './user/ActionDispatch';
import JWT from '../lib/JWT/JWT';

describe('#handleTokenResponse', () => {
  describe('when status 200', () => {
    it('set user cookie, and return decoded jwt ', () => {
      const response = {
        status: 200, 
        data: { token: 'fbjdsbfs.fbsdfbisdfbdsjbf.fgydsbfbd' } 
      };

      const data = { username: 'username', email: 'user@email.com' };

      const decodeJWTTokenSpy = jest.spyOn(JWT, 'decodeJWTToken');
      decodeJWTTokenSpy.mockImplementation(jwt => data);

      ActionsHelper.handleTokenResponse(response);

      expect(ActionsHelper.handleTokenResponse(response)).toEqual(data)
    });
  });
});