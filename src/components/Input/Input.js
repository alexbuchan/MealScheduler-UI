import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,  // The name on the label that renders in the UI
  name: PropTypes.string,   // The name of the field
  type: PropTypes.string,   // The type of input for the field
  value: PropTypes.string,  // The value of the input in the field
  onChange: PropTypes.func,  // The onChange function for updating the field
  validationField: PropTypes.object   // Validation object returned from the Validator instance.
};

const Input = ({ label, name, type, value, onChange, validationField }) => {
  const inputFieldClass = () => {
    return (!validationField.isInvalid) ? "" : "input-field-error";
  }

  const withValidation = () => {
    return (
      <div className='form-element'>
        <p>{label}:</p>
        <input
          className={ inputFieldClass() }
          name={ name }
          type={ type }
          value={ value }
          onChange={ onChange }
        />
        <span className="help-block">{ validationField.message }</span>
      </div>
    );
  }

  const noValidation = () => {
    return (
      <div className='form-element'>
        <p>{label}:</p>
        <input
          name={ name }
          type={ type }
          value={ value }
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

Input.propTypes = propTypes;
export default Input;