import waitForExpect from 'wait-for-expect';
import request from "axios";
import ContactActions from './ContactActions';
import ActionDispatch from './ActionDispatch';

jest.mock('./ActionDispatch');
jest.mock('axios');

describe('ContactActions', () => {
  describe('#getContacts', () => {
    it('calls API and retrieves all contacts data', async () => {  
      const response = { data: ['contact1', 'contact2'] };
      await request.get.mockImplementation(() => Promise.resolve(response));
      ContactActions.getContacts();
      
      await waitForExpect(() => {
        expect(ActionDispatch.dispatchContactsData).toHaveBeenCalledWith(response.data);
      });
    });
  });
});