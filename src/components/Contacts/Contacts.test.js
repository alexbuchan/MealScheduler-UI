import Contacts from './Contacts';
import { componentSetup } from '../../testUtils/testUtils';

describe('Contacts', () => {
  describe('when contacts as props are NOT passed', () => {
    let instance;
    let props;
    
    beforeEach(() => {
      props = {
        contacts: []
      };

      instance = componentSetup(Contacts, props);
    });

    it('should return null', () => {
      expect(instance.type()).toBeNull();
    });
  });

  describe('when contacts as props are passed', () => {
    let instance;
    let props;
    
    beforeEach(() => {
      props = {
        contacts: [
          { name: 'Contact1', email: 'contact1@email.com' },
          { name: 'Contact2', email: 'contact2@email.com' }
        ]
      };
  
      instance = componentSetup(Contacts, props);
    });

    it('Should render without errors', () => {
      expect(instance).toMatchSnapshot();
    });
  });
});