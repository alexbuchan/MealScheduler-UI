import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,              // The name on the label that renders in the UI. /Optional
  name: PropTypes.string.isRequired,    // The name of the field
  type: PropTypes.string,               // The type of input for the field
  value: PropTypes.string.isRequired,   // The value of the input in the field
  disabled: PropTypes.bool,             // Disables the text field
  placeholder: PropTypes.string,        // Optional placeholder for textfield
  onChange: PropTypes.func.isRequired,  // The onChange function for updating the field
  validationField: PropTypes.object,    // Validation object returned from the Validator instance.
  isRequired: PropTypes.bool            // When validation from a form is turned on, this marks the field as required
};

const TextField = ({ label, name, type, value, disabled, placeholder, onChange, validationField }) => {
  const inputFieldClass = () => {
    return (!validationField.isInvalid) ? "" : "input-field-error";
  }

  const isRequiredLabel = () => {
    if (validationField.isRequired) {
      return <span data-test='text-field-is-required' className='text-field-is-required'>*</span>;
    }

    return null;
  }

  const withValidation = () => {
    return (
      <div className='form-element'>
        <div>
          <label>{ label }</label>
          { isRequiredLabel() }
        </div>

        <input
          data-test='input-with-validation'
          className={ inputFieldClass() }
          name={ name }
          type={ type }
          value={ value }
          disabled={ disabled }
          placeholder={ placeholder }
          onChange={ onChange }
        />

        <span className="help-block">{ validationField.message }</span>
      </div>
    );
  }

  const noValidation = () => {
    return (
      <div className='form-element'>
        <label>{ label }</label>
        <input
          name={ name }
          type={ type }
          value={ value }
          disabled={ disabled }
          placeholder={ placeholder }
          onChange={ onChange }
        />
      </div>
    );
  }

  if (validationField) {
    return withValidation();
  }

  return noValidation();
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = propTypes;
export default TextField;