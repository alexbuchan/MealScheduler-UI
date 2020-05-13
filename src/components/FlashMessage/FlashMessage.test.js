import FlashMessage from './FlashMessage';
import Actions from '../../actions/FlashMessageActions/FlashMessageActions';
import Store from '../../stores/FlashMessageStore/FlashMessageStore';
import { componentSetup, findByTestAttribute } from '../../testUtils/testUtils';

jest.mock('../../actions/FlashMessageActions/FlashMessageActions');

describe('FlashMessage', () => {
  let instance;

  beforeEach(() => {
    jest.useFakeTimers();
    instance = componentSetup(FlashMessage);
  });

  afterEach(() => {
    jest.clearAllTimers();
    Actions.closeFlashMessage.mockClear();
  });

  describe('When there are no errors in the store', () => {
    it('Should not render', () => {
      expect(instance).toMatchSnapshot();
    });
  });

  describe('When there is an error in the store', () => {
    it('Should render, wait for 3 seconds, then stop rendering', () => {
      // Simulate state change triggered by store
      const error = { data: { error: 'Invalid email' } };
      Store.addErrorMessage(error);

      // component is rendering
      expect(instance).toMatchSnapshot();
      expect(Actions.closeFlashMessage).not.toBeCalled();

      jest.advanceTimersByTime(3000);

      expect(Actions.closeFlashMessage).toHaveBeenCalled();
      Store.closeFlashMessage();
      
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when there are multiple error messages in the store', () => {
    it('Should render, wait for 3 seconds, then stop rendering', () => {
      // Simulate state change triggered by store
      const error = { data: { error: ['Invalid email', 'invalid username'] } };
      Store.addErrorMessage(error);

      // component is rendering
      expect(instance).toMatchSnapshot();
      expect(Actions.closeFlashMessage).not.toBeCalled();

      jest.advanceTimersByTime(3000);
      expect(Actions.closeFlashMessage).toHaveBeenCalled();
      Store.closeFlashMessage();
      
      expect(instance).toMatchSnapshot();
    });
  });

  describe('#_onClick', () => {
    it('triggers the closeFlashMessage action when user clicks to close FlashMessage', () => {
      // Simulate state change triggered by store
      const error = { data: { error: ['Invalid email', 'invalid username'] } };
      Store.addErrorMessage(error);

      // Find close button and simulate click
      const closeFlashMessageButton = findByTestAttribute(instance, 'close-flash-message');
      closeFlashMessageButton.simulate('click', { button: 0 });

      expect(Actions.closeFlashMessage).toHaveBeenCalled();
    });
  });

  describe('#renderErrorMessage', () => {
    describe('When error message contains a field and message', () => {
      it('Should render a list element for each error in the flash message', () => {
        // Simulate state change triggered by store
        const error = {
          data: {
            error: [
              { field: 'email', message: 'Invalid email'},
              { field: 'username', message: 'Username too short' }
            ] 
          } 
        };

        Store.addErrorMessage(error);

        // component is rendering
        expect(instance).toMatchSnapshot();
      });
    });

    describe('When error message contains only a string', () => {
      it('Should render only one list item for the error in the flash message', () => {
        const error = { data: { error: 'Invalid email' } };
        Store.addErrorMessage(error);

        // component is rendering
        expect(instance).toMatchSnapshot();
      });
    });
  });

  describe('#componentWillUnmount', () => {
    it('Should remove the Store event listener', () => {
      const removeChangeListenerSpy = jest.spyOn(Store, 'removeChangeListener');
      instance.unmount();
      expect(removeChangeListenerSpy).toHaveBeenCalled();
    });
  });
});