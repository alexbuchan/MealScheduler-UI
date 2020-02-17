import React from 'react';
import UserActions from '../actions/user';
import UserStore from '../stores/user';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SignupLoginBackground from '../components/SignupLoginBackground';
import UserLogin from '../components/UserLogin';

class LoginView extends React.Component {
  loginUser() {
    console.log('Login');
  }

  render() {
    return (
      <div className="row">
        <SignupLoginBackground />
        <UserLogin loginUser={ this.loginUser.bind(this) } />
      </div>
    );
  }
}

export default LoginView;
