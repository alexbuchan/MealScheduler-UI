import React from 'react';
import UserActions from '../actions/user';
import SignupLoginBackground from '../components/SignupLoginBackground';
import UserSignup from '../components/UserSignup';

class SignupView extends React.Component {
  signupUser(user) {
    UserActions.registerUser(user);
  }

  render() {
    return (
      <div className="row">
        <SignupLoginBackground />
        <UserSignup auth={ this.props.auth } signupUser={ this.signupUser.bind(this) } />
      </div>
    );
  }
}

export default SignupView;
