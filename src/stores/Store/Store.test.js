import Store from './Store';
import Dispatcher from '../../dispatcher/dispatcher';

jest.mock('../../dispatcher/dispatcher');

describe('Store', () => {
  const instance = new Store();
  let callback;

  beforeEach(() => {
    callback = Dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(Dispatcher.register.mock.calls.length).toBe(1);
  });

  describe('#_registerToActions', () => {
    it('not implemented', () => {
      expect(instance._registerToActions()).toBe('Not implemented');
    });
  });

  describe('#addChangeListener', () => {
    it('adds an event listener to callback', () => {
      const mockCallback = jest.fn();
      const spy = jest.spyOn(instance, 'on');

      instance.addChangeListener(mockCallback);
      expect(spy).toHaveBeenCalledWith('CHANGE', mockCallback);
    });
  });

  describe('#removeChangeListener', () => {
    it('removes an event listener from callback', () => {
      const mockCallback = jest.fn();
      const spy = jest.spyOn(instance, 'removeListener');

      instance.removeChangeListener(mockCallback);
      expect(spy).toHaveBeenCalledWith('CHANGE', mockCallback);
    });
  });
});