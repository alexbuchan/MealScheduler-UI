import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserActions from '../../actions/user/UserActions';
import Form from '../Form/Form';
import TextField from '../formComponents/TextField/TextField';

const propTypes = {
  user: PropTypes.object   // User prop makes sure once registration has taken place that form can redirect.
}


class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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

  handleOnSubmit = () => {
    UserActions.registerUser(this.state);
  }

  formRedirect = () => {
    if (this.props.user) return true;
    else return false;
  }

  render() {
    return (
      <div className='user-signup'>
        <div className='signup-form'>
          <Form
            submitButtonLabel='Register!'
            validate={ true }
            fields={ this.state }
            areRequired={ ['username', 'email', 'password'] }
            onSubmit={ this.handleOnSubmit }
            redirect={ true }
            redirectTo='/schedule'
            shouldRedirect={ this.formRedirect() }
          >
            <TextField
              label='Username'
              name='username'
              value={ this.state.username }
              onChange={ this.handleOnChange }
            />

            <TextField
              label='Email'
              name='email'
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
          <p className="form-link">Already have an account? <Link className="" to="/login">Log in</Link></p>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = propTypes;
export default SignupForm;
