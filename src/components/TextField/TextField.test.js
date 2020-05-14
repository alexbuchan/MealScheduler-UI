import TextField from './TextField';
import { componentSetup, findByTestAttribute } from '../../testUtils/testUtils';

describe('TextField', () => {
  describe('When validation is disabled', () => {
    describe('When no label is specified', () => {
      let instance;

      beforeEach(() => {
        const props = {
          name: 'name',
          value: 'value',
          onChange: () => {}
        };

        instance = componentSetup(TextField, props);
      });
      
      it('Should not render a label', () => {
        expect(instance).toMatchSnapshot();
      });
    });

    describe('When no type is specified', () => {
      let instance;

      beforeEach(() => {
        const props = {
          label: 'label',
          name: 'name',
          value: 'value',
          onChange: () => {}
        };

        instance = componentSetup(TextField, props);
      });
      
      it('Should render as type text', () => {
        expect(instance).toMatchSnapshot();
      });
    });

    describe('When all props are specified expect validationField', () => {
      let instance;

      beforeEach(() => {
        const props = {
          label: 'label',
          name: 'name',
          type: 'text',
          value: 'value',
          onChange: () => {}
        };

        instance = componentSetup(TextField, props);
      });
      
      it('Should render correctly', () => {
        expect(instance).toMatchSnapshot();
      });
    });
  });

  describe('When validation is enabled', () => {
    describe('When input is valid', () => {
      let instance;

      beforeEach(() => {
        const props = {
          label: 'label',
          name: 'name',
          type: 'text',
          value: 'valid value',
          onChange: () => {},
          validationField: { isInvalid: false, message: '' }
        };

        instance = componentSetup(TextField, props);
      });

      it('should not render validation error message', () => {
        expect(instance).toMatchSnapshot();
      });

      it('input className should be an empty string', () => {
        expect(findByTestAttribute(instance, 'input-with-validation').hasClass('')).toBe(true);
      });
    });

    describe('When input is NOT valid', () => {
      let instance;

      beforeEach(() => {
        const props = {
          label: 'label',
          name: 'name',
          type: 'text',
          value: 'invalid value',
          onChange: () => {},
          validationField: { isInvalid: true, message: 'Value must be valid' }
        };

        instance = componentSetup(TextField, props);
      });

      it('should render validation error message', () => {
        expect(instance).toMatchSnapshot();
      });

      it('input className should be "input-field-error"', () => {
        expect(findByTestAttribute(instance, 'input-with-validation').hasClass('input-field-error')).toBe(true);
      });
    });
  });
});