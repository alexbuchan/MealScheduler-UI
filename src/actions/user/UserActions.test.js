import request from "axios";
import JWT from '../../lib/JWT';
import Actions from './UserActions';
import ActionDispatch from './ActionDispatch';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ActionsHelper from "../ActionsHelper";

jest.mock('./ActionDispatch');
jest.mock('../FlashMessageActions/FlashMessageActions');
jest.mock('axios');

describe('UserActions', () => {
  describe('#registerUser', () => {
    describe('when user has registered correctly', () => {
      it('calls handleSignupLoginResponse', async () => {  
        const handleSignupLoginResponseSpy = jest.spyOn(Actions, 'handleSignupLoginResponse');
        const response = { data: { username: 'username', email: 'user@email.com' } };
        request.post.mockImplementation(() => Promise.resolve(response));

        await Actions.registerUser();

        expect(handleSignupLoginResponseSpy).toHaveBeenCalledWith(response, ActionDispatch.dispatchRegisterUser);
      });
    });

    describe('when user registration returns an error', () => {
      it('calls FlashMessage dispatch error action with error object', async () => {  
        const error = { response: { data: { error: 'error1' } } };
        request.post.mockImplementation(() => Promise.reject(error));
        await Actions.registerUser();

        expect(FlashMessageActions.dispatchErrorMessage).toHaveBeenCalledWith(error.response);
      });
    });
  });

  describe('#loginUser', () => {
    describe('when user has logged in correctly', () => {
      it('calls handleSignupLoginResponse', async () => {  
        const handleSignupLoginResponseSpy = jest.spyOn(Actions, 'handleSignupLoginResponse');
        const response = { data: { username: 'username', email: 'user@email.com' } };
        request.post.mockImplementation(() => Promise.resolve(response));

        await Actions.loginUser();

        expect(handleSignupLoginResponseSpy).toHaveBeenCalledWith(response, ActionDispatch.dispatchRegisterUser);
      });
    });

    describe('when user registration returns an error', () => {
      it('calls FlashMessage dispatch error action with error object', async () => {  
        const error = { response: { data: { error: 'error2' } } };
        request.post.mockImplementation(() => Promise.reject(error));
        await Actions.loginUser();

        expect(FlashMessageActions.dispatchErrorMessage).toHaveBeenCalledWith(error.response);
      });
    });
  });

  describe('#logoutUser', () => {
    describe('when user has logged out correctly', () => {
      it('removes user cookie', () => {  
        const removeCookieSpy = jest.spyOn(ActionsHelper, 'removeCookie');
        Actions.logoutUser();
        expect(removeCookieSpy).toHaveBeenCalled();
      });

      it('calls logout dispatch method', () => {  
        Actions.logoutUser();
        expect(ActionDispatch.dispatchLogoutUser).toHaveBeenCalled();
      });
    });
  });

  describe('#retrieveUserDataOnRefresh', () => {
    describe('when user is logged in and cookie is present', () => {
      it('fetches user browser cookie calls dispatch method', () => {
        const cookie = 'fbjdsbfs.fbsdfbisdfbdsjbf.fgydsbfbd';
        const data = { data: { username: 'username', email: 'user@email.com' } };

        const getCookieSpy = jest.spyOn(ActionsHelper, 'getCookie');
        getCookieSpy.mockImplementation(user => cookie);

        const decodeJWTTokenSpy = jest.spyOn(JWT, 'decodeJWTToken');
        decodeJWTTokenSpy.mockImplementation(cookie => data)

        Actions.retrieveUserDataOnRefresh();

        expect(ActionDispatch.dispatchUserDataOnRefresh).toHaveBeenCalledWith(data)
      });
    });
  });

  describe('#handleSignupLoginResponse', () => {
    describe('when status 200', () => {
      it('decode JWT, set user cookie, and dispatch data to UserStore', () => {
        const response = {
          status: 200, 
          data: { token: 'fbjdsbfs.fbsdfbisdfbdsjbf.fgydsbfbd' } 
        };

        const data = { username: 'username', email: 'user@email.com' };

        const decodeJWTTokenSpy = jest.spyOn(JWT, 'decodeJWTToken');
        decodeJWTTokenSpy.mockImplementation(jwt => data);

        const dispatchRegisterUserSpy = jest.spyOn(ActionDispatch, 'dispatchRegisterUser');

        Actions.handleSignupLoginResponse(response, dispatchRegisterUserSpy);

        expect(ActionDispatch.dispatchRegisterUser).toHaveBeenCalledWith(data)
      });
    });
  });
});