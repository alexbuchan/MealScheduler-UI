import ContactCard from './ContactCard';
import { componentSetup } from '../../../testUtils/testUtils';

describe('ContactCard', () => {
  let instance;
  let props;
  
  beforeEach(() => {
    props = {
      contact: {
        name: 'Mr Test',
        username: 'Testa Bomb',
        email: 'testa.bomb@email.com',
        address: {
          street: 'Test Street',
          suite: 'Describe',
          city: 'Jest City',
          zipcode: '98798'
        },
        phone: '0989876554',
        website: 'www.thetestway.com'
      }
    };

    instance = componentSetup(ContactCard, props);
  });

  it('Should render without errors', () => {
    expect(instance).toMatchSnapshot();
  });
});