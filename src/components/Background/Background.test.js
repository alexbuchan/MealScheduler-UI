import Background from './Background';
import { componentSetup } from '../../testUtils/testUtils';

describe('Background', () => {
  let instance;
  
  beforeEach(() => {
    instance = componentSetup(Background);
  });

  it('Should render without errors', () => {
    expect(instance).toMatchSnapshot();
  });
});