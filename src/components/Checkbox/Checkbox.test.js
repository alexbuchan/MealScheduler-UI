import Checkbox from './Checkbox';
import { componentSetup, findByTestAttribute } from '../../testUtils/testUtils';

describe('Checkbox', () => {
  describe('When no label is specified', () => {
    let instance;

    beforeEach(() => {
      const props = {
        name: 'name',
        type: 'text',
        onChange: () => {}
      };

      instance = componentSetup(Checkbox, props);
    });
    
    it('Should not render a label', () => {
      expect(instance).toMatchSnapshot();
    });
  });

  describe('When no value is specified', () => {
    let instance;

    beforeEach(() => {
      const props = {
        name: 'name',
        type: 'text',
        onChange: () => {}
      };

      instance = componentSetup(Checkbox, props);
    });
    
    it('Value should be false', () => {
      expect(instance).toMatchSnapshot();
    });
  });

  describe('When all props are passed', () => {
    let instance;

    beforeEach(() => {
      const props = {
        label: 'label',
        name: 'name',
        type: 'text',
        value: false,
        onChange: () => {}
      };

      instance = componentSetup(Checkbox, props);
    });
    
    it('Should render correctly', () => {
      expect(instance).toMatchSnapshot();
    });
  });
});