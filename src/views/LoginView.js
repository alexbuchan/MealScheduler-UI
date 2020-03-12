import React from 'react';
import UserActions from '../actions/user';
import SignupLoginBackground from '../components/SignupLoginBackground';
import UserLogin from '../components/UserLogin';

class LoginView extends React.Component {
  loginUser(user) {
    UserActions.loginUser(user);
  }

  render() {
    return (
      <div className="row">
        <SignupLoginBackground />
        <UserLogin auth={ this.props.auth } loginUser={ this.loginUser.bind(this) } />
      </div>
    );
  }
}

export default LoginView;
