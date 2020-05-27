import App from './App';
import { componentSetup } from '../testUtils/testUtils';

describe('App', () => {
  let instance;
  
  beforeEach(() => {
    instance = componentSetup(App);
  });

  it('Should render without errors', () => {
    expect(instance).toMatchSnapshot();
  });
});