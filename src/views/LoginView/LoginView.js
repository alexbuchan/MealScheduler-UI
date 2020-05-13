/* Library imports */
import React from 'react';

/* Store imports */
import UserStore from '../../stores/UserStore/UserStore';

/* Component imports */
import Background from '../../components/Background/Background';
import LoginForm from '../../components/LoginForm/LoginForm';

class LoginView extends React.Component {
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
          <LoginForm user={ this.state.user } />
        </div>
      </div>
    );
  }
}

export default LoginView;
