import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserActions from '../../actions/user/UserActions';
import Form from '../Form/Form';
import TextField from '../TextField/TextField';

const propTypes = {
  user: PropTypes.object   // User prop makes sure once login has taken place that form can redirect.
}

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

  formRedirect = () => {
    if (this.props.user) return true;
    else return false;
  }

  handleOnSubmit = () => {
    UserActions.loginUser(this.state);
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
          shouldRedirect={ this.formRedirect() }
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

LoginForm.propTypes = propTypes;
export default LoginForm;
