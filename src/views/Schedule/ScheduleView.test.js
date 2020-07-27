import ScheduleView from './ScheduleView';
import Store from '../../stores/ScheduleStore/ScheduleStore';
import { componentSetup } from '../../testUtils/testUtils';

describe('ScheduleView', () => {
  describe('#render', () => {
    describe('when schedule is loading', () => {
      let instance;

      beforeEach(() => {
        instance = componentSetup(ScheduleView);
      });
      
      it('should pass loading state to loader isLoading prop', () => {
        const loader = instance.find('Loader');
        expect(loader.prop('isLoading')).toBe(true);
      });
    });

    describe('when schedule is NOT loading', () => {
      let instance;

      beforeEach(() => {
        instance = componentSetup(ScheduleView);
      });
      
      it('should pass loading state to loader isLoading prop', () => {
        Store.getScheduleData(['contact1', 'contact2']);
        const loader = instance.find('Loader');
        expect(loader.prop('isLoading')).toBe(false);
      });
    });
  });

  describe('#componentWillUnmount', () => {
    let instance;
  
    beforeEach(() => {
      instance = componentSetup(ScheduleView);
    });
    
    it('Should remove the Store event listener', () => {
      const removeChangeListenerSpy = jest.spyOn(Store, 'removeChangeListener');
      instance.unmount();
      expect(removeChangeListenerSpy).toHaveBeenCalled();
    });
  });
});