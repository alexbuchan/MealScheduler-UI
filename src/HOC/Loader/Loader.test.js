import Loader from './Loader';
import UserStore from '../../stores/UserStore/UserStore';
import { componentSetup } from '../../testUtils/testUtils';

describe('Loader', () => {
  describe('#render', () => {
    describe('when wrapped component is retrieving data', () => {
      let withLoader;
      let instance;
      let props;
    
      beforeEach(() => {
        const mockComponent = jest.fn();
        props = {
          isLoading: true,
          loaderClassName: 'loaderClassName'
        };

        withLoader = Loader(mockComponent);
        instance = componentSetup(withLoader, props);
      });
      
      it('should display the loader', () => {
        expect(instance).toMatchSnapshot();
      });
    });

    describe('when wrapped component is finished retrieving data', () => {
      let withLoader;
      let instance;
      let props;
    
      beforeEach(() => {
        const mockComponent = jest.fn();
        props = {
          isLoading: false,
          loaderClassName: 'loaderClassName'
        };

        withLoader = Loader(mockComponent);
        instance = componentSetup(withLoader, props);
      });

      it('should render the wrapped component', () => {
        const user = { username: 'username', email: 'user@email.com' };
        UserStore.loginUser({ user: user, message: 'User logged in.', auth: true });
        expect(instance).toMatchSnapshot();
      });
    });
  });
});