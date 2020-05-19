import NavBar from './NavBar';
import UserStore from '../../stores/UserStore/UserStore';
import UserActions from '../../actions/user/UserActions';
import { componentSetup, findByTestAttribute } from '../../testUtils/testUtils';

jest.mock('../../actions/user/UserActions');

describe('NavBar', () => {
  describe('When user is not logged in', () => {
    let instance;

    beforeEach(() => {
      instance = componentSetup(NavBar);
    });

    it('Should render contacts, login, and signup in the navbar', () => {
      expect(instance).toMatchSnapshot();
    });
  });

  describe('When user is logged in', () => {
    let instance;

    beforeEach(() => {
      instance = componentSetup(NavBar);
      UserStore.loginUser({
        auth: true,
        user: { username: 'username', email: 'user@email.com' },
        message: 'User is logged in.'
      });
    });

    it('Should render username, contacts, and logout in the navbar', () => {
      expect(instance).toMatchSnapshot();
    });

    describe('#handleLogout', () => {
      it('calls the user logout action', () => {
        const logoutLink = findByTestAttribute(instance, 'logout-nav-link');
        logoutLink.simulate('click', { button: 0 });

        expect(UserActions.logoutUser).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('#componentWillUnmount', () => {
    let instance;

    beforeEach(() => {
      instance = componentSetup(NavBar);
    });

    it('Should remove the Store event listener', () => {
      const removeChangeListenerSpy = jest.spyOn(UserStore, 'removeChangeListener');
      instance.unmount();
      expect(removeChangeListenerSpy).toHaveBeenCalled();
    });
  });
});