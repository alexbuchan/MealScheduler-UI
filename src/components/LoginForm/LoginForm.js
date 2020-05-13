import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import UserActions from '../../actions/user/UserActions';
import Form from '../Form/Form';
import Input from '../Input/Input';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    UserActions.loginUser(fields);
  }

  render() {
    if (this.props.user) return <Redirect to='/contacts' />;

    return (
      <div className='col-lg-4 flex-sm-column justify-content-center align-items-center user-signup'>
        <Form
          validate={ true }
          fields={ { email: this.state.email, password: this.state.password } }
          onSubmit={ this.handleOnSubmit }
        >
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
        <p className="form-link">Don't have an account? <Link className="" to="/">Register</Link></p>
      </div>
    );
  }
}

export default LoginForm;
