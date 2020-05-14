import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,              // The name on the label that renders in the UI. /Default empty string
  name: PropTypes.string.isRequired,    // The name of the field.
  type: PropTypes.string.isRequired,    // The type of input for the field.
  value: PropTypes.bool,                // The value of the input in the field. /Default is false
  onChange: PropTypes.func.isRequired   // The onChange function for updating the field.
};

const Checkbox = ({ label, name, type, value, onChange }) => {
  return (
    <div className="form-element">
      <label>{ label }</label>
      <input name={ name } type={ type } defaultChecked={ value } onChange={ onChange } />
    </div>
  );;
}

Checkbox.defaultProps = {
  label: '',
  value: false
}

Checkbox.propTypes = propTypes;
export default Checkbox;