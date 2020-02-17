import React from 'react';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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
    const { name, email, password } = this.state;
    let user = { name, email, password };

    this.props.loginUser(user);
    this.setState({
      email: '',
      password: ''
    });

    ev.preventDefault();
  }

  render() {
    return (
      <div className='col-lg-4 flex-sm-column justify-content-center align-items-center user-signup'>
        <form className='signup-form' onSubmit={ this.handleOnSubmit }>
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

export default UserLogin;
