import UserEntryView from './UserEntryView';
import UserStore from '../../stores/UserStore/UserStore';
import { componentSetup } from '../../testUtils/testUtils';

describe('#UserEntryView', () => {
  describe('#render', () => {
    describe('when Component is passed to UserEntryView', () => {
      let WithEntryView;
      let instance;
    
      beforeEach(() => {
        const mockComponent = jest.fn();
        WithEntryView = UserEntryView(mockComponent);
        instance = componentSetup(WithEntryView);
      });
      
      it('should contain mockComponent', () => {
        const mockComponent = instance.find('mockConstructor');
        expect(mockComponent).toBeDefined();
      });
    });

    describe('when user state changes', () => {
      let WithEntryView;
      let instance;
    
      beforeEach(() => {
        const mockComponent = jest.fn();
        WithEntryView = UserEntryView(mockComponent);
        instance = componentSetup(WithEntryView);
      });

      it('should update the props for wrapped component', () => {
        expect(instance.state().user).toBeUndefined();

        UserStore.loginUser({
          auth: true,
          user: { username: 'username', email: 'user@email.com' },
          message: 'User is logged in.'
        });

        expect(instance.state().user).toEqual({
          username: 'username', 
          email: 'user@email.com'
        });

        const mockComponent = instance.find('mockConstructor');
        expect(mockComponent.prop('user')).toEqual({
          username: 'username', 
          email: 'user@email.com'
        });
      });
    });
  });

  describe('#componentWillUnmount', () => {
    let WithEntryView;
    let instance;
  
    beforeEach(() => {
      const mockComponent = jest.fn();
      WithEntryView = UserEntryView(mockComponent);
      instance = componentSetup(WithEntryView);
    });
    
    it('Should remove the Store event listener', () => {
      const removeChangeListenerSpy = jest.spyOn(UserStore, 'removeChangeListener');
      instance.unmount();
      expect(removeChangeListenerSpy).toHaveBeenCalled();
    });
  });
});