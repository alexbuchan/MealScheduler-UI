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
});