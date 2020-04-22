jest.enableAutomock();
jest.dontMock('./ContactStore');
jest.dontMock('../../constants/contactConstants');

import Constants from '../../constants/contactConstants';

describe('ContactStore', () => {
  let Dispatcher;
  let ContactStore;
  let callback;

  beforeEach(() => {
    ContactStore = require('./ContactStore').default;
    Dispatcher = require('../../dispatcher/dispatcher').default;
    callback = Dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(Dispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes contacts with empty array', () => {
    const getContactState = ContactStore.getContactState();
    expect(getContactState).toEqual({ contacts: [] });
  });

  describe('getContacts', () => {
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