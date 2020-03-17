import React from 'react';
import { Redirect } from 'react-router-dom';

class UserSignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      redirect: false,
      disableSubmitButton: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.state.disableSubmitButton) {
      this.turnOffSubmitButtonDisable = setTimeout(() => { 
        this.setState(() => ({ disableSubmitButton: false }))
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.turnOffSubmitButtonDisable);
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
      redirect: true,
      disableSubmitButton: true
    });
  }

  render() {
    if (this.state.redirect && this.props.cookie) return <Redirect to='/contacts' />;
   
    return (
      <div className='user-signup'>
        <div className='signup-form'>
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
          <button disabled={ this.state.disableSubmitButton } onClick={ this.handleOnSubmit }>Register!</button>
        </div>
      </div>
    );
  }
}

export default UserSignup;
