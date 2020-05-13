import React from 'react';
import UserStore from '../stores/UserStore/UserStore';
import Background from '../components/Background/Background';
import UserSignup from '../components/UserSignup/UserSignup';

class SignupView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: UserStore.getUserState().user
    }
  }

  _onChange = () => {
    this.setState({
      user: UserStore.getUserState().user,
    });
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div className='signup-login-view-wrapper'>
        <div className='signup-login-view'>
          <Background />
          <UserSignup user={ this.state.user } />
        </div>
      </div>
    );
  }
}

export default SignupView;
