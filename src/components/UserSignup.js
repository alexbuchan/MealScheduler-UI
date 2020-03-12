import React from 'react';
import { Redirect } from "react-router-dom";

class UserSignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      redirect: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  handleOnSubmit(ev) {
    ev.preventDefault();

    const { name, email, password } = this.state;
    let user = { name, email, password };

    this.props.signupUser(user);
    this.setState({
      name: '',
      email: '',
      password: '',
      redirect: true
    });
  }

  render() {
    if (this.state.redirect && this.props.auth) return <Redirect to='/contacts' />;
   
    return (
      <div className='col-lg-4 flex-sm-column justify-content-center align-items-center user-signup'>
        <form className='signup-form' onSubmit={ this.handleOnSubmit }>
          <div className='form-element'>
            <p>Name:</p>
            <input name='name' type='text' value={ this.state.name } onChange={ this.handleOnChange }/>
          </div>
          <div className='form-element'>
            <p>Email:</p>
            <input name='email' type='text' value={ this.state.email } onChange={ this.handleOnChange }/>
          </div>
          <div className='form-element'>
            <p>Password:</p>
            <input name='password' type='password' value={ this.state.password } onChange={ this.handleOnChange }/>
          </div>
          <input type='submit' value='Register!'/>
        </form>
      </div>
    );
  }
}

export default UserSignup;
