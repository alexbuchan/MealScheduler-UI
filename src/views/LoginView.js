import React from 'react';
import UserActions from '../actions/user/UserActions';
import Background from '../components/Background/Background';
import UserLogin from '../components/UserLogin/UserLogin';

class LoginView extends React.Component {
  loginUser(user) {
    UserActions.loginUser(user);
  }

  render() {
    return (
      <div className='signup-login-view-wrapper'>
        <div className='signup-login-view'>
          <Background />
          <UserLogin user={ this.props.user } loginUser={ this.loginUser.bind(this) } />
        </div>
      </div>
    );
  }
}

export default LoginView;
