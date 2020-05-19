import SignupForm from './SignupForm';
import Form from '../Form/Form';
import UserActions from '../../actions/user/UserActions';
import { componentSetup } from '../../testUtils/testUtils';

jest.mock('../../actions/user/UserActions');

describe('SignupForm', () => {
  let instance;

  beforeEach(() => {
    const props = {
      user: undefined
    }

    instance = componentSetup(SignupForm, props);
  });

  it('renders correctly', () => {
    expect(instance).toMatchSnapshot();
  });

  describe('#handleOnChange', () => {
    it('sets the state to input value each time user inputs a value', () => {
      const preventDefault = jest.fn();
      const emailTextField = instance.find({ name: 'email' });

      emailTextField.simulate("change", { target: { name: 'email', value: 'email' }, preventDefault: preventDefault });

      expect(instance.state().email).toBe('email');
    });
  });

  describe('#formRedirect', () => {
    describe('when user is NOT registered', () => {
      let instance;

      beforeEach(() => {
        const props = {
          user: undefined
        }

        instance = componentSetup(SignupForm, props);
      });

      it('returns false', () => {
        expect(instance.instance().formRedirect()).toBe(false);
      });
    });

    describe('when user is registered', () => {
      let instance;

      beforeEach(() => {
        const props = {
          user: { username: 'username', email: 'user@email.com' }
        }

        instance = componentSetup(SignupForm, props);
      });

      it('returns true', () => {
        expect(instance.instance().formRedirect()).toBe(true);
      });
    });
  });

  describe('#handleOnSubmit', () => {
    it('calls the user register action', () => {
      const preventDefault = jest.fn();
      const form = instance.find(Form);

      instance.instance().setState({
        username: 'username',
        email: 'user@email.com',
        password: 'password'
      });

      form.simulate("submit", { preventDefault: preventDefault });

      expect(UserActions.registerUser).toHaveBeenCalledTimes(1);
      expect(UserActions.registerUser).toHaveBeenCalledWith({
        username: 'username',
        email: 'user@email.com',
        password: 'password'
      });
    });
  });
});