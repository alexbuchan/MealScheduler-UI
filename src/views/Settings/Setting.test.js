import Settings from './Settings';
import Form from '../../components/Form/Form';
import UserStore from '../../stores/UserStore/UserStore';
import { componentSetup, findByTestAttribute } from '../../testUtils/testUtils';
import SettingsActions from '../../actions/settings/SettingsActions';

jest.mock('../../actions/settings/SettingsActions');

describe('Settings', () => {
  let instance;
  let initialState;
  let preventDefault = jest.fn();


  beforeEach(() => {
    const data = {
      auth: true,
      message: 'User logged in',
      user: {
        username: 'user',
        email: 'user@email.com'
      }
    };

    UserStore.loginUser(data);
    instance = componentSetup(Settings);
    initialState = instance.instance().state;
  });

  describe('#render', () => {
    let instance;
    let editButton;

    beforeEach(() => {
      instance = componentSetup(Settings);
      editButton = findByTestAttribute(instance, 'edit-button');
    });

    it('renders correctly', () => {
      expect(instance).toMatchSnapshot();
    });

    describe('when user clicks "edit"', () => {
      let editButton;

      beforeEach(() => {
        editButton = findByTestAttribute(instance, 'edit-button');
        editButton.simulate('click', { preventDefault: preventDefault });
      });

      it('should enable text fields and submit button', () => {
        expect(instance.instance().state.edit).toBe(true);
        expect(instance.instance().state.disableSubmitButton).toBe(false);
      });
    });

    describe('when user clicks cancel edit button', () => {
      let cancelEditButton;
      let usernameTextField;
      let emailTextField;

      beforeEach(() => {
        editButton.simulate('click', { preventDefault: preventDefault });

        usernameTextField = instance.find({ name: 'username' });
        emailTextField = instance.find({ name: 'email' });

        usernameTextField.simulate("change", { target: { name: 'username', value: 'newUser' }, preventDefault: preventDefault });
        emailTextField.simulate("change", { target: { name: 'email', value: 'newUser@email.com' }, preventDefault: preventDefault });

        cancelEditButton = findByTestAttribute(instance, 'cancel-edit-button');
        cancelEditButton.simulate('click', { preventDefault: preventDefault });
      });

      it('should disable text fields and submit button', () => {
        expect(instance.instance().state.edit).toBe(false);
        expect(instance.instance().state.disableSubmitButton).toBe(true);
      });

      it('text fields should contain the initial user state', () => {
        expect(instance.instance().state).toEqual(initialState);
      });

      it('no action was called', () => {
        expect(SettingsActions.updateUserSettings).not.toHaveBeenCalled();
      });
    });
  });

  describe('#handleOnSubmit', () => {
    beforeEach(() => {
      const form = instance.find(Form);

      instance.instance().setState({
        username: 'newUser',
        email: 'newUser@email.com'
      });

      form.simulate("submit", { preventDefault: preventDefault });
    });

    it('calls Settings Action to update the user data', () => {
      expect(SettingsActions.updateUserSettings).toHaveBeenCalledTimes(1);
      expect(SettingsActions.updateUserSettings).toHaveBeenCalledWith({
        username: 'newUser',
        email: 'newUser@email.com'
      });
    });

    it('resets state to initial state', () => {
      expect(instance.instance().state).toEqual(initialState);
    });
  });

  describe('#componentWillUnmount', () => {
    let instance;
  
    beforeEach(() => {
      instance = componentSetup(Settings);
    });
    
    it('Should remove the Store event listener', () => {
      const removeChangeListenerSpy = jest.spyOn(UserStore, 'removeChangeListener');
      instance.unmount();
      expect(removeChangeListenerSpy).toHaveBeenCalled();
    });
  });
});