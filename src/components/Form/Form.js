import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Validator from '../../lib/Validator/Validator';

const propTypes = {
  submitButtonLabel: PropTypes.string,  // Provide a label name for the submit button. /Default is 'Submit'
  validate: PropTypes.bool,             // Should the form be validated. /Default is false
  fields: PropTypes.object,             // Provide the fields for validation if validation is enabled
  onSubmit: PropTypes.func.isRequired,  // Provide the onSubmit function to handle form submittion
  redirect: PropTypes.bool,             // Enable redirecting. /Will redirect on component render unless shouldRedirect prop is used
  redirectTo: PropTypes.string,         // If redirect enabled, pass route to be redirected to
  shouldRedirect: PropTypes.bool        // Tells the form when it should redirect
};

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableSubmitButton: false
    }

    if (this.props.validate) {
      let formChildren = React.Children.toArray(this.props.children);
      const validationFields = formChildren.map(child => child.props.name);
      this.validator = new Validator(...validationFields);
      this.state.validation = this.validator.valid();
    }

    this.submitted = false;
  }

  shouldComponentUpdate(_, nextState) {
    if (nextState.validation.isValid && this.submitted) {
      this.resetValidation();
      this.submitted = false;
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    if (this.state.disableSubmitButton) {
      this.turnOffSubmitButtonDisable = setTimeout(() => {
        this.setState(() => ({ disableSubmitButton: false }))
      }, 1000);
    }
  }

  handleOnSubmit = (ev) => {
    ev.preventDefault();

    if (this.props.validate) {
      const validation = this.validator.validate(this.props.fields);
      this.setState({ validation });
      this.submitted = true;
  
      if (validation.isValid) {
        this.props.onSubmit();
        this.disableSubmitButtonOnSubmit();
      }
    } else {
      this.props.onSubmit();
      this.disableSubmitButtonOnSubmit();
    }
  }

  resetValidation = () => {
    this.setState({
      validation: this.validator.valid()
    })
  }

  disableSubmitButtonOnSubmit = () => {
    this.setState({
      disableSubmitButton: true
    });
  }

  validationEnabled = () => {
    let validation = this.submitted ? this.validator.validate(this.props.fields) : this.state.validation;
    const children = React.Children.toArray(this.props.children);
    return children.map(child => React.cloneElement(child, { validationField: validation[child.props.name] }));
  }

  render() {
    if (this.props.redirect && this.props.shouldRedirect) return <Redirect to={ this.props.redirectTo } />

    const children = (this.props.validate) ? this.validationEnabled() : this.props.children;

    return (
      <div className='my-form'>
        { children }
        <button
          data-test="form-submit-button"
          className="form-submit-button"
          disabled={ this.state.disableSubmitButton }
          onClick={ this.handleOnSubmit }
        >
          { this.props.submitButtonLabel }
        </button>
      </div>
    );
  }
}

Form.defaultProps = {
  submitButtonLabel: 'Submit',
  validate: false,
  redirect: false
}

Form.propTypes = propTypes;
export default Form;