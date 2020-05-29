import Settings from './Settings';
import UserStore from '../../stores/UserStore/UserStore';
import { componentSetup } from '../../testUtils/testUtils';

describe('Settings', () => {
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
  });

  describe('#render', () => {

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