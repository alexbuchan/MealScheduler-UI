import React from 'react';
import { Link } from 'react-router-dom';
import UserActions from '../../actions/user/UserActions';
import Form from '../Form/Form';
import Input from '../Input/Input';

class UserSignup extends React.Component {
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

  handleOnSubmit = (fields) => {
    UserActions.registerUser(fields);
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
            onSubmit={ this.handleOnSubmit }
            redirectTo='/contacts'
            shouldRedirect={ this.formRedirect }
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
