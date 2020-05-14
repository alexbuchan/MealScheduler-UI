import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Validator from '../../lib/Validator';

const propTypes = {
  submitButtonLabel: PropTypes.string,  // Provide a label name for the submit button. /Default is 'Submit'
  validate: PropTypes.bool,             // Should the form be validated. /Default is false
  fields: PropTypes.object.isRequired,  // Provide the fields for validation
  onSubmit: PropTypes.func.isRequired,  // Provide the onSubmit function to handle form submittion
  redirect: PropTypes.bool,             // Should the form redirect. /Default is false
  redirectTo: PropTypes.string,         // If redirect enabled, pass route to be redirected to
  shouldRedirect: PropTypes.func,       // If redirect enabled, pass conditions to Form for redirect
};

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      disableSubmitButton: false
    }

    if (this.props.validate) {
      const validationFields = this.props.children.map(child => child.props.name);
      this.validator = new Validator(...validationFields);
      this.state.validation = this.validator.valid();
    }

    this.submitted = false;
  }

  componentDidUpdate() {
    if (this.state.disableSubmitButton) {
      this.turnOffSubmitButtonDisable = setTimeout(() => {
        this.setState(() => ({ disableSubmitButton: false }))
      }, 1000);
    }

    this.redirect();
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

  redirect = () => {
    if (this.props.redirect && this.props.shouldRedirect()) {
      this.setState({ redirect: true });
    }
  }

  validationEnabled = () => {
    let validation = this.submitted ? this.validator.validate(this.props.fields) : this.state.validation;
    const children = React.Children.toArray(this.props.children);
    return children.map(child => React.cloneElement(child, { validationField: validation[child.props.name] }));
  }

  render() {
    if (this.state.redirect) return <Redirect to={ this.props.redirectTo } />;

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