import ContactsView from './ContactsView';
import Store from '../../stores/ContactStore/ContactStore';
import { componentSetup } from '../../testUtils/testUtils';

describe('ContactsView', () => {
  describe('#render', () => {
    describe('when contacts are loading', () => {
      let instance;

      beforeEach(() => {
        instance = componentSetup(ContactsView);
      });
      
      it('should pass loading state to loader isLoading prop', () => {
        const loader = instance.find('Loader');
        expect(loader.prop('isLoading')).toBe(true);
      });
    });

    describe('when contacts are NOT loading', () => {
      let instance;

      beforeEach(() => {
        instance = componentSetup(ContactsView);
      });
      
      it('should pass loading state to loader isLoading prop', () => {
        Store.getContactsData(['contact1', 'contact2']);
        const loader = instance.find('Loader');
        expect(loader.prop('isLoading')).toBe(false);
      });
    });
  });

  describe('#componentWillUnmount', () => {
    let instance;
  
    beforeEach(() => {
      instance = componentSetup(ContactsView);
    });
    
    it('Should remove the Store event listener', () => {
      const removeChangeListenerSpy = jest.spyOn(Store, 'removeChangeListener');
      instance.unmount();
      expect(removeChangeListenerSpy).toHaveBeenCalled();
    });
  });
});