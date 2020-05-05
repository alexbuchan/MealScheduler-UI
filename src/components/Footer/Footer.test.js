import Footer from './Footer';
import { componentSetup } from '../../testUtils/testUtils';

describe('Footer', () => {
  let instance;
  
  beforeEach(() => {
    instance = componentSetup(Footer);
  });

  it('Should render without errors', () => {
    expect(instance).toMatchSnapshot();
  });
});