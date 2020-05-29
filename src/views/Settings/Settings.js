import React from 'react';
import Form from '../../components/Form/Form';
import TextField from '../../components/TextField/TextField';
import Actions from '../../actions/settings/SettingsActions';
import UserStore from '../../stores/UserStore/UserStore';
import FlashMessage from '../../components/FlashMessage/FlashMessage';

class Settings extends React.Component {
  constructor() {
    super();

    this.initialState = {
      username: UserStore.getUser().username,
      email: UserStore.getUser().email,
      userDetailsEdit: false,
    }

    this.state = this.initialState;
    this.submitted = false;
  }

  _onChange = () => {
    if (UserStore.getUser()) {
      this.setState({
        username: UserStore.getUser().username,
        email: UserStore.getUser().email
      });
      
      this.initialState = this.state;
    }
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  handleUserDetailsEditClick = (ev) => {
    this.setState({
      userDetailsEdit: true
    });
  }

  handleUserDetailsCancelEditClick = (ev) => {
    this.setState(this.initialState);
  }

  handleOnChange = (ev) => {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  handleUserDetailsOnSubmit = () => {
    const fields = { username: this.state.username, email: this.state.email };
    Actions.updateUserSettings(fields);
    this.setState(this.initialState);
  }

  render() {
    const userDetailFields = { username: this.state.username, email: this.state.email };

    return (
      <div className="settings-view">
        <h1 className="settings-header">Settings</h1>

        <div className="settings">
          <div className="user-signup">
            <h3>Change User Details</h3>
            { (!this.state.userDetailsEdit) ? <button onClick={ this.handleUserDetailsEditClick }>Edit</button> : null }
            { (this.state.userDetailsEdit) ? <button onClick={ this.handleUserDetailsCancelEditClick }>X</button> : null }

            <Form
              validate={ true }
              fields={ userDetailFields }
              areRequired={ ['username', 'email'] }
              onSubmit={ this.handleUserDetailsOnSubmit }
            >
              <TextField
                label='Username'
                name='username'
                type='text'
                value={ this.state.username }
                disabled={ !this.state.userDetailsEdit }
                onChange={ this.handleOnChange }
                isRequired={ true }
              />

              <TextField
                label='Email'
                name='email'
                type='text'
                value={ this.state.email }
                onChange={ this.handleOnChange }
                disabled={ !this.state.userDetailsEdit }
                isRequired={ true }
              />
            </Form>
          </div>
        </div>

        <FlashMessage />
      </div>
    );
  }
}

export default Settings;