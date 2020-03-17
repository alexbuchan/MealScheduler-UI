import React from 'react';
import { Redirect } from "react-router-dom";
import UserActions from '../../actions/user';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    // UserActions.disableButtonDuringSubmit();

    const { name, email, password } = this.state;
    let user = { name, email, password };

    this.props.loginUser(user);
    this.setState({
      email: '',
      password: '',
      redirect: true,
      disableSubmitButton: true
    });
  }

  render() {
    if (this.state.redirect && this.props.cookie) return <Redirect to='/contacts' />;

    return (
      <div className='col-lg-4 flex-sm-column justify-content-center align-items-center user-signup'>
        <div className='signup-form'>
          <div className='form-element'>
            <p>Email:</p>
            <input name='email' type='text' value={ this.state.email } onChange={ this.handleOnChange }/>
          </div>
          <div className='form-element'>
            <p>Password:</p>
            <input name='password' type='password' value={ this.state.password } onChange={ this.handleOnChange }/>
          </div>
          <button disabled={ this.state.disableSubmitButton } onClick={ this.handleOnSubmit }>Login!</button>
        </div>
      </div>
    );
  }
}

export default UserLogin;
