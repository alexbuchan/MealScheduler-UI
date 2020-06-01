import request from "axios";
import JWT from '../../lib/JWT/JWT';
import Actions from './SettingsActions';
import UserActionDispatch from '../user/ActionDispatch';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ActionsHelper from "../ActionsHelper";

jest.mock('../user/ActionDispatch');
jest.mock('../FlashMessageActions/FlashMessageActions');
jest.mock('axios');

describe('SettingsActions', () => {
  describe('#updateUserSettings', () => {
    describe('when user has updated correctly', () => {
      it('calls handleTokenResponse', async () => {
        const data = { user: { user_id: 1, username: 'username', email: 'user@email.com' } };

        const decodeJWTTokenSpy = jest.spyOn(JWT, 'decodeJWTToken');
        decodeJWTTokenSpy.mockImplementation(jwt => data);

        const handleTokenResponseSpy = jest.spyOn(ActionsHelper, 'handleTokenResponse');
        const response = { data: { username: 'username', email: 'user@email.com' }, status: 202 };
        request.put.mockImplementation(() => Promise.resolve(response));

        await Actions.updateUserSettings();

        expect(handleTokenResponseSpy).toHaveBeenCalledWith(response, UserActionDispatch.dispatchRegisterUser);
      });
    });

    describe('when user registration returns an error', () => {
      it('calls FlashMessage dispatch error action with error object', async () => {
        const error = { response: { data: { error: 'error1' }, status: 400 } };
        request.put.mockImplementation(() => Promise.reject(error));
        await Actions.updateUserSettings();

        expect(FlashMessageActions.dispatchErrorMessage).toHaveBeenCalledWith(error.response);
      });
    });
  });
});