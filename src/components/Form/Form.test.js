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
      let instance;

      beforeEach(() => {
        const props = {
          validate: true,
          fields: { username: 'username' },
          onSubmit: () => {},
          children: <TextField key={ 1 } value='' data-test='text-field1' name='username' onChange={ () => {} } />
        }

        instance = componentSetup(Form, props);
      });

      it('instance should contain validation in state', () => {
        expect(instance.state().validation).toBeDefined();
      });

      describe('when a form element is passed to the form', () => {
        it('should render that element and a submit button', () => {
          expect(instance).toMatchSnapshot();
        });

        it('child element should contain a new prop called ValidationField', () => {
          const textField = findByTestAttribute(instance, 'text-field1');
          expect(textField.prop('validationField')).toBeDefined();
        });
      });
    });
  });

  describe('#handleOnSubmit', () => {
    describe('when validate is disabled', () => {
      let instance;
      let onSubmitMock;
      let disableSubmitButtonOnSubmitSpy;
      let preventDefault;
      let formSubmitButton;

      beforeEach(() => {
        const props = {
          onSubmit: jest.fn(),
          children: <TextField key={ 1 } value='' data-test='text-field1' name='textField1' onChange={ () => {} } />
        }

        instance = componentSetup(Form, props);

        onSubmitMock = instance.instance().props.onSubmit;
        disableSubmitButtonOnSubmitSpy = jest.spyOn(instance.instance(), 'disableSubmitButtonOnSubmit');
        preventDefault = jest.fn();
        formSubmitButton = findByTestAttribute(instance, 'form-submit-button');

        formSubmitButton.simulate('click', { button: 0, preventDefault: preventDefault });
      });

      it('should call props function "onSubmit"', () => {
        expect(onSubmitMock).toHaveBeenCalledTimes(1);
      });

      it('should call "disableSubmitButtonOnSubmit"', () => {
        expect(disableSubmitButtonOnSubmitSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when validate is enabled', () => {
      let instance;
      let onSubmitMock;
      let disableSubmitButtonOnSubmitSpy;
      let preventDefault;
      let formSubmitButton;

      beforeEach(() => {
        const props = {
          validate: true,
          fields: { username: 'username', email: 'user@email.com', password: 'password' },
          onSubmit: jest.fn(),
          children: [
            <TextField key={ 1 } value='' data-test='text-field-username' name='username' onChange={ () => {} } />,
            <TextField key={ 1 } value='' data-test='text-field-email' name='email' onChange={ () => {} } />,
            <TextField key={ 1 } value='' data-test='text-field-password' name='password' onChange={ () => {} } />
          ]
        }

        instance = componentSetup(Form, props);
        onSubmitMock = instance.instance().props.onSubmit;
        disableSubmitButtonOnSubmitSpy = jest.spyOn(instance.instance(), 'disableSubmitButtonOnSubmit');
        preventDefault = jest.fn();
        formSubmitButton = findByTestAttribute(instance, 'form-submit-button');

        formSubmitButton.simulate('click', { button: 0, preventDefault: preventDefault });
      });

      it('form attribute "submitted" should be true', () => {
        expect(instance.instance().submitted).toBe(true);
      });

      describe('when fields are valid', () => {
        it('should call props function "onSubmit"', () => {
          expect(onSubmitMock).toHaveBeenCalledTimes(1);
        });

        it('should call "disableSubmitButtonOnSubmit"', () => {
          expect(disableSubmitButtonOnSubmitSpy).toHaveBeenCalledTimes(1);
        });
      });

      describe('when fields are NOT valid', () => {
        let instance;
        let onSubmitMock;
        let disableSubmitButtonOnSubmitSpy;
        let preventDefault;
        let formSubmitButton;

        beforeEach(() => {
          const props = {
            validate: true,
            fields: { username: 'us', email: 'email', password: 'pass' },
            onSubmit: jest.fn(),
            children: [
              <TextField key={ 1 } value='' data-test='text-field-username' name='username' onChange={ () => {} } />,
              <TextField key={ 1 } value='' data-test='text-field-email' name='email' onChange={ () => {} } />,
              <TextField key={ 1 } value='' data-test='text-field-password' name='password' onChange={ () => {} } />
            ]
          }

          instance = componentSetup(Form, props);
          onSubmitMock = instance.instance().props.onSubmit;
          disableSubmitButtonOnSubmitSpy = jest.spyOn(instance.instance(), 'disableSubmitButtonOnSubmit');
          preventDefault = jest.fn();
          formSubmitButton = findByTestAttribute(instance, 'form-submit-button');

          formSubmitButton.simulate('click', { button: 0, preventDefault: preventDefault });
        });

        it('form attribute "submitted" should be true', () => {
          expect(instance.instance().submitted).toBe(true);
        });

        it('should NOT call props function "onSubmit"', () => {
          expect(onSubmitMock).not.toHaveBeenCalled();
        });
        
        it('should NOT call "disableSubmitButtonOnSubmit"', () => {
          expect(disableSubmitButtonOnSubmitSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});