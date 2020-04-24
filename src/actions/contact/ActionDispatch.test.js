import waitForExpect from 'wait-for-expect';
import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/contactConstants';
import ActionDispatch from './ActionDispatch';

jest.mock('../../dispatcher/dispatcher');
jest.mock('./ActionDispatch');
jest.mock('axios');

describe('ActionDispatch', () => {
  describe('#dispatchContactsData', () => {
    it('calls API and retrieves all contacts data', () => {  
      const data = ['contact1', 'contact2'];
      
      ActionDispatch.dispatchContactsData(data);

      waitForExpect(() => {
        expect(Dispatcher.dispatch).toHaveBeenCalledWith({
          actionType: Constants.GET_CONTACTS_DATA,
          data
        });
      });
    });
  });
});