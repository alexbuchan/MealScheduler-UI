import ContactAddress from './ContactAddress';
import { componentSetup } from '../../../../testUtils/testUtils';

describe('ContactAddress', () => {
  let instance;
  let props;
  
  beforeEach(() => {
    props = {
      index: 0,
      item: ['Street', 'Kulas Light']
    };

    instance = componentSetup(ContactAddress, props);
  });

  it('Should render without errors', () => {
    expect(instance).toMatchSnapshot();
  });

  describe('when item is geo', () => {
    let instance;
    let props;
    
    beforeEach(() => {
      props = {
        index: 0,
        item: ['geo', 'lat: -34.397, lng: 150.644']
      };

      instance = componentSetup(ContactAddress, props);
    });

    it('should return null', () => {
      expect(instance.type()).toBeNull();
    });
  });
});