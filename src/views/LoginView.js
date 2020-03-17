import React from 'react';
import UserActions from '../actions/user';
import SignupLoginBackground from '../components/SignupLoginBackground/SignupLoginBackground';
import UserLogin from '../components/UserLogin/UserLogin';

class LoginView extends React.Component {
  loginUser(user) {
    UserActions.loginUser(user);
  }

  render() {
    return (
      <div className='signup-login-view-wrapper'>
        <div className='signup-login-view'>
          <SignupLoginBackground />
          <UserLogin cookie={ this.props.cookie } loginUser={ this.loginUser.bind(this) } />
        </div>
      </div>
    );
  }
}

export default LoginView;
