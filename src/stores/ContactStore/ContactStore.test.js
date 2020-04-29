import ContactStore from './ContactStore';
import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/contactConstants';

jest.mock('../../dispatcher/dispatcher');

describe('ContactStore', () => {
  let callback;

  beforeEach(() => {
    callback = Dispatcher.register.mock.calls[0][0];
  });

  it('initializes ContactStore with default values', () => {
    const getContactState = ContactStore.getContactState();
    expect(getContactState).toEqual({ contacts: [] });
  });

  describe('#getContactsData', () => {
    it('adds contacts to contactState', () => {
      const getContactsMock = {
        actionType: Constants.GET_CONTACTS_DATA,
        data: ['contact1', 'contact2']
      };

      callback(getContactsMock);
      const getContactState = ContactStore.getContactState();
      expect(getContactState).toEqual({ contacts: ['contact1', 'contact2'] })
    });
  });
});