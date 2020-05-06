import GenericNotFound from './GenericNotFound';
import { componentSetup } from '../../testUtils/testUtils';

describe('GenericNotFound', () => {
  let instance;
  
  beforeEach(() => {
    instance = componentSetup(GenericNotFound);
  });

  it('Should render without errors', () => {
    expect(instance).toMatchSnapshot();
  });
});