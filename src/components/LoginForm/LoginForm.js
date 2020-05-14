import React from 'react';
import { Link } from 'react-router-dom';
import UserActions from '../../actions/user/UserActions';
import Form from '../Form/Form';
import TextField from '../TextField/TextField';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleOnChange = (ev) => {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  handleOnSubmit = (fields) => {
    UserActions.loginUser(fields);
  }

  formRedirect = () => {
    if (this.props.user) return true;
    else return false;
  }

  render() {
    return (
      <div className='col-lg-4 flex-sm-column justify-content-center align-items-center user-signup'>
        <Form
          submitButtonLabel='Log in'
          validate={ true }
          fields={ this.state }
          onSubmit={ this.handleOnSubmit }
          redirect={ true }
          redirectTo='/contacts'
          shouldRedirect={ this.formRedirect }
        >
          <TextField
            label='Email'
            name='email'
            type='text'
            value={ this.state.email }
            onChange={ this.handleOnChange }
          />

          <TextField
            label='Password'
            name='password'
            type='password'
            value={ this.state.password }
            onChange={ this.handleOnChange }
          />

        </Form>
        <p className="form-link">Don't have an account? <Link className="" to="/">Register</Link></p>
      </div>
    );
  }
}

export default LoginForm;
