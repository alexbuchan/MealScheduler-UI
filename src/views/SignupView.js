import React from 'react';
import UserActions from '../actions/user/UserActions';
import SignupLoginBackground from '../components/SignupLoginBackground/SignupLoginBackground';
import UserSignup from '../components/UserSignup/UserSignup';

class SignupView extends React.Component {
  signupUser(user) {
    UserActions.registerUser(user);
  }

  render() {
    return (
      <div className='signup-login-view-wrapper'>
        <div className='signup-login-view'>
          <SignupLoginBackground />
          <UserSignup user={ this.props.user } signupUser={ this.signupUser.bind(this) } />
        </div>
      </div>
    );
  }
}

export default SignupView;
