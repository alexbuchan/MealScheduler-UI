import React from 'react';
import UserActions from '../actions/user/user';
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
          <UserLogin user={ this.props.user } loginUser={ this.loginUser.bind(this) } />
        </div>
      </div>
    );
  }
}

export default LoginView;
