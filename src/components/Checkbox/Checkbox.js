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

const Checkbox = ({ label, name, type, value, onChange, validationField }) => {
  const withValidation = () => {
    return (
      <div className="form-element">
        <label>{ label }</label>
        <input name={ name } type={ type } defaultChecked={ value } onChange={ onChange } />
      </div>
    );
  }

  const noValidation = () => {
    return (
      <div className="form-element">
        <label>{ label }</label>
        <input name={ name } type={ type } defaultChecked={ value } onChange={ onChange } />
      </div>
    );
  }

  if (validationField) {
    return withValidation();
  }

  return noValidation();
}

Checkbox.propTypes = propTypes;
export default Checkbox;