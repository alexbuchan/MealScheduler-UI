import request from "axios";
import ContactActions from './ContactActions';
import ActionDispatch from './ActionDispatch';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';

jest.mock('./ActionDispatch');
jest.mock('../FlashMessageActions/FlashMessageActions');
jest.mock('axios');

describe('ContactActions', () => {
  describe('#getContacts', () => {
    describe('when API retrieves data correctly', () => {
      it('calls action dispatch method with all contacts data', async () => {
        const response = { data: ['contact1', 'contact2'] };
        request.get.mockImplementation(() => Promise.resolve(response));
        await ContactActions.getContacts();

        expect(ActionDispatch.dispatchContactsData).toHaveBeenCalledWith(response.data);
      });
    });

    describe('when API returns an error', () => {
      it('calls FlashMessage dispatch error action with error object', async () => {
        const error = { response: { data: { error: 'error1' } } };
        await request.get.mockImplementation(() => Promise.reject(error));
        await ContactActions.getContacts();

        expect(FlashMessageActions.dispatchErrorMessage).toHaveBeenCalledWith(error.response);
      });
    });
  });
});