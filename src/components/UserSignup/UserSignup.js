import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import UserActions from '../../actions/user/UserActions';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Validator from '../../lib/Validator';

class UserSignup extends React.Component {
  constructor(props) {
    super(props);

    this.validator = new Validator('username', 'email', 'password');

    this.state = {
      username: '',
      email: '',
      password: ''
    };

    this.submitted = false;
  }

  handleOnChange = (ev) => {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  handleOnSubmit = (fields) => {
    UserActions.registerUser(fields);
  }

  render() {
    if (this.props.user) return <Redirect to='/contacts' />;
   
    return (
      <div className='user-signup'>
        <div className='signup-form'>
          <Form
            validate={ true }
            fields={ { username: this.state.username, email: this.state.email, password: this.state.password } }
            onSubmit={ this.handleOnSubmit }
          >
            <Input
              label='Username'
              name='username'
              type='text'
              value={ this.state.username }
              onChange={ this.handleOnChange }
            />

            <Input
              label='Email'
              name='email'
              type='text'
              value={ this.state.email }
              onChange={ this.handleOnChange }
            />

            <Input
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

export default UserSignup;
