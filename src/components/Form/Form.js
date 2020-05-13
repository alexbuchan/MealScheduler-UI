import React from 'react';
import PropTypes from 'prop-types';
import Validator from '../../lib/Validator';

const propTypes = {
  validate: PropTypes.bool,   // Should the form be validated
  fields: PropTypes.object.isRequired,   // Provide the fields for validation
  onSubmit: PropTypes.func.isRequired,   // Provide the onSubmit function to handle form submittion
};

class Form extends React.Component {
  constructor(props) {
    super(props);

    const validationFields = this.props.children.map(child => child.props.name);
    this.validator = new Validator(...validationFields);

    this.state = {
      redirect: false,
      disableSubmitButton: false,
      validation: this.validator.valid()
    }

    this.submitted = false;
  }

  handleOnSubmit = (ev) => {
    ev.preventDefault();

    if (this.props.validate) {
      const validation = this.validator.validate(this.props.fields);
      this.setState({ validation });
      this.submitted = true;
  
      if (validation.isValid) {
        this.props.onSubmit(this.props.fields);
        this.disableSubmitButtonOnSubmit();
      }
    } else {
      this.props.onSubmit(this.props.fields);
      this.disableSubmitButtonOnSubmit();
    }
  }

  disableSubmitButtonOnSubmit = () => {
    this.setState({
      disableSubmitButton: true
    });
  }

  render() {
    let validation = this.submitted ? this.validator.validate(this.props.fields) : this.state.validation;
    const children = React.Children.toArray(this.props.children);
    const clonedChildren = children.map(child => React.cloneElement(child, { validationField: validation[child.props.name] }));

    return (
      <div className='my-form'>
        { clonedChildren }
        <button className="form-submit-button" disabled={ this.state.disableSubmitButton } onClick={ this.handleOnSubmit }>Submit settings</button>
      </div>
    );
  }
}

Form.defaultProps = {
  validate: false
}

Form.propTypes = propTypes;
export default Form;