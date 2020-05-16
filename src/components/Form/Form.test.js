import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { mount } from 'enzyme';
import { componentSetup, findByTestAttribute } from '../../testUtils/testUtils';
import Form from './Form';
import TextField from '../TextField/TextField';

describe('Form', () => {
  let instance;

  beforeEach(() => {
    const props = {
      fields: { username: 'username', password: 'password' },
      onSubmit: () => {}
    }

    instance = componentSetup(Form, props);
  });

  describe('when form has been submitted', () => {
    it('Submit button should be disabled for a second then enabled again', () => {
      jest.useFakeTimers();
      const preventDefault = jest.fn();
      const formSubmitButton = findByTestAttribute(instance, 'form-submit-button');

      formSubmitButton.simulate('click', { button: 0, preventDefault: preventDefault });
      
      jest.advanceTimersByTime(100);
      const formSubmitButton2 = findByTestAttribute(instance, 'form-submit-button');
      expect(formSubmitButton2.prop('disabled')).toBe(true);

      jest.advanceTimersByTime(999);
      const formSubmitButton3 = findByTestAttribute(instance, 'form-submit-button');
      expect(formSubmitButton3.prop('disabled')).toBe(false);
    });
  });

  describe('#render', () => {
    it('instance should NOT contain validation in state', () => {
      expect(instance.state()).not.toHaveProperty('validation');
    });

    describe('when passing only required props', () => {
      describe('when no form elements are passed to the form', () => {
        let instance;

        beforeEach(() => {
          const props = {
            fields: { username: 'username', password: 'password' },
            onSubmit: () => {}
          }

          instance = componentSetup(Form, props);
        });

        it('should render just a submit button', () => {
          expect(instance).toMatchSnapshot();
        });
      });

      describe('when a form element is passed to the form', () => {
        let instance;

        beforeEach(() => {
          const props = {
            fields: { username: 'username', password: 'password' },
            onSubmit: () => {},
            children: <TextField key={ 1 } value='' name='textField1' onChange={ () => {} } />
          }

          instance = componentSetup(Form, props);
        });

        it('should render that element and a submit button', () => {
          expect(instance).toMatchSnapshot();
        });
      });
    });

    describe('when redirect is enabled', () => {
      let instance;
        
      beforeEach(() => {
        const props = {
          fields: { username: 'username', password: 'password' },
          onSubmit: () => {},
          redirect: true,
          redirectTo: '/route',
          shouldRedirect: false
        }

        instance = mount(React.createElement(props => (
          <MemoryRouter>
            <Form {...props} />
          </MemoryRouter>
        ), props));
      });

      it('redirects to path specified in prop redirectTo', () => {
        const form = instance.find(Form);
        expect(form).toMatchSnapshot();
        instance.setProps({ shouldRedirect: true });
        const form2 = instance.find(Form);
        expect(form2).toMatchSnapshot();
      });
    });

    describe('when validation is enabled', () => {
      it('instance should contain validation in state', () => {

      });

      describe('when no form elements are passed to the form', () => {
        it('should render just a submit button', () => {

        });

        it('submit button should contain the value "Submit"', () => {

        });
      });

      describe('when a form element is passed to the form', () => {
        it('should render that element and a submit button', () => {

        });

        it('submit button should contain the value "Submit"', () => {

        });

        it('child element should contain a new prop called ValidationField', () => {

        });
      });
    });
  });

  describe('#handleOnSubmit', () => {
    describe('when validate is disabled', () => {
      it('should call props function "onSubmit"', () => {

      });

      it('should call "disableSubmitButtonOnSubmit"', () => {

      });
    });

    describe('when validate is enabled', () => {
      it('this.submitted should be true', () => {

      });

      describe('when fields are valid', () => {
        it('should call props function "onSubmit"', () => {

        });

        it('should call "disableSubmitButtonOnSubmit"', () => {

        });
      });

      describe('when fields are NOT valid', () => {
        it('should NOT call props function "onSubmit"', () => {

        });
        
        it('should NOT call "disableSubmitButtonOnSubmit"', () => {

        });
      });
    });
  });
});