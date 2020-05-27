import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,              // The name on the label that renders in the UI. /Optional
  name: PropTypes.string.isRequired,    // The name of the field
  type: PropTypes.string,               // The type of input for the field
  value: PropTypes.string.isRequired,   // The value of the input in the field
  placeholder: PropTypes.string,         // Optional placeholder for textfield
  onChange: PropTypes.func.isRequired,  // The onChange function for updating the field
  validationField: PropTypes.object     // Validation object returned from the Validator instance.
};

const TextField = ({ label, name, type, value, placeholder, onChange, validationField }) => {
  const inputFieldClass = () => {
    return (!validationField.isInvalid) ? "" : "input-field-error";
  }

  const withValidation = () => {
    return (
      <div className='form-element'>
        <label>{ label }</label>
        <input
          data-test='input-with-validation'
          className={ inputFieldClass() }
          name={ name }
          type={ type }
          value={ value }
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