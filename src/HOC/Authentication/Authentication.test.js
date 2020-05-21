import Authentication from './Authentication';
import UserStore from '../../stores/UserStore/UserStore';
import { componentSetup } from '../../testUtils/testUtils';

describe('Authentication', () => {
  describe('#render', () => {
    describe('when user is NOT authenticated', () => {
      let withAuthentication;
      let instance;
    
      beforeEach(() => {
        const mockComponent = jest.fn();
        withAuthentication = Authentication(mockComponent);
        instance = componentSetup(withAuthentication);
        instance.setState({ auth: false });
      });
      
      it('should redirect to /login', () => {
        expect(instance).toMatchSnapshot();
      });
    });

    describe('when user is authenticated', () => {
      let withAuthentication;
      let instance;
    
      beforeEach(() => {
        const mockComponent = jest.fn();
        withAuthentication = Authentication(mockComponent);
        instance = componentSetup(withAuthentication);
      });

      it('should render the wrapped component', () => {
        const user = { username: 'username', email: 'user@email.com' };
        UserStore.loginUser({ user: user, message: 'User logged in.', auth: true });
        expect(instance).toMatchSnapshot();
      });
    });
  });

  describe('#componentWillUnmount', () => {
    let withAuthentication;
    let instance;
  
    beforeEach(() => {
      const mockComponent = jest.fn();
      withAuthentication = Authentication(mockComponent);
      instance = componentSetup(withAuthentication);
    });
    
    it('Should remove the Store event listener', () => {
      const removeChangeListenerSpy = jest.spyOn(UserStore, 'removeChangeListener');
      instance.unmount();
      expect(removeChangeListenerSpy).toHaveBeenCalled();
    });
  });
});