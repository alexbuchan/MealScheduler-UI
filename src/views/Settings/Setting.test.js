import Settings from './Settings';
import UserStore from '../../stores/UserStore/UserStore';
import { componentSetup } from '../../testUtils/testUtils';

describe('Settings', () => {
  describe('#render', () => {
    describe('when contacts are loading', () => {
      let instance;

      beforeEach(() => {
        instance = componentSetup(Settings);
      });
      
      it('should pass loading state to loader isLoading prop', () => {
        const loader = instance.find('Loader');
        expect(loader.prop('isLoading')).toBe(true);
      });
    });

    describe('when contacts are NOT loading', () => {
      let instance;

      beforeEach(() => {
        instance = componentSetup(Settings);
      });
      
      it('should pass loading state to loader isLoading prop', () => {
        UserStore.getContactsData(['contact1', 'contact2']);
        const loader = instance.find('Loader');
        expect(loader.prop('isLoading')).toBe(false);
      });
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