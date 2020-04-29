import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/contactConstants';
import ActionDispatch from './ActionDispatch';

jest.mock('../../dispatcher/dispatcher');

describe('ActionDispatch', () => {
  describe('#dispatchContactsData', () => {
    it('calls API and retrieves all contacts data', async () => {  
      const data = ['contact1', 'contact2'];
      
      ActionDispatch.dispatchContactsData(data);


      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.GET_CONTACTS_DATA,
        data
      });
    });
  });
});