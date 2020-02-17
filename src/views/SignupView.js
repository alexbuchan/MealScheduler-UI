import React from 'react';
import UserActions from '../actions/user';
import UserStore from '../stores/user';
import SignupLoginBackground from '../components/SignupLoginBackground';
import UserSignup from '../components/UserSignup';

class SignupView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ user: UserStore._getUser() });
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  signupUser(user) {
    UserActions.createUser(user);
  }

  render() {
    return (
      <div className="row">
        <SignupLoginBackground />
        <UserSignup signupUser={ this.signupUser.bind(this) } />
      </div>
    );
  }
}

export default SignupView;
