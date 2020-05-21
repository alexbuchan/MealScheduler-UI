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
    beforeEach(() => {
      const getContactsMock = {
        actionType: Constants.GET_CONTACTS_DATA,
        data: ['contact1', 'contact2']
      };

      callback(getContactsMock);
    });

    it('adds contacts to contactState', () => {
      const contacts = ContactStore.getContactState().contacts;
      expect(contacts).toEqual(['contact1', 'contact2'])
    });
  });
});