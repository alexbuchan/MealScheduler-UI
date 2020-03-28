import React from 'react';
import { Redirect } from "react-router-dom";
import Validator from '../../lib/Validator';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.validator = new Validator('email', 'password');

    this.state = {
      email: '',
      password: '',
      redirect: false,
      disableSubmitButton: false,
      validation: this.validator.valid()
    };

    this.submitted = false;
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.state.disableSubmitButton) {
      this.turnOffSubmitButtonDisable = setTimeout(() => { 
        this.setState(() => ({ disableSubmitButton: false }))
      }, 1000);
    }

    if (this.props.user) {
      this.clearFormState();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.turnOffSubmitButtonDisable);
  }

  handleOnChange(ev) {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      const { email, password } = this.state;
      let user = { email, password };

      this.props.loginUser(user);
    }
  }

  clearFormState = () => {
    this.setState({
      email: '',
      password: '',
      redirect: true,
      disableSubmitButton: true,
      validation: this.validator.valid()
    });
  }

  inputFieldClass = (field, validation) => {
    return (!validation[field].isInvalid) ? "" : "input-field-error";
  }

  render() {
    if (this.state.redirect && this.props.user) return <Redirect to='/contacts' />;
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;

    return (
      <div className='col-lg-4 flex-sm-column justify-content-center align-items-center user-signup'>
        <div className='signup-form'>
          <div className='form-element'>
            <p>Email:</p>
            <input
              className={ this.inputFieldClass('email', validation) }
              name='email'
              type='text'
              value={ this.state.email }
              onChange={ this.handleOnChange }
            />
            <span className="help-block">{validation.email.message}</span>
          </div>
          <div className='form-element'>
            <p>Password:</p>
            <input
              className={ this.inputFieldClass('password', validation) }
              name='password'
              type='password'
              value={ this.state.password }
              onChange={ this.handleOnChange }
            />
            <span className="help-block">{validation.password.message}</span>
          </div>
          <button disabled={ this.state.disableSubmitButton } onClick={ this.handleOnSubmit }>Login!</button>
        </div>
      </div>
    );
  }
}

export default UserLogin;
