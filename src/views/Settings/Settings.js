import React from 'react';
import Form from '../../components/Form/Form';
import TextField from '../../components/TextField/TextField';
import Actions from '../../actions/settings/SettingsActions';
import UserStore from '../../stores/UserStore/UserStore';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
// import UserStore from '../stores/UserStore/UserStore';

class Settings extends React.Component {
  constructor(props) {
    super(props);
debugger
    this.state = {
      username: '',
      email: '',
      password: '',
      placerholders: {
        username: UserStore.getUser().username,
        email: UserStore.getUser().email
      }
    }

    this.submitted = false;
  }

  _onChange = () => {
    this.setState({
      placerholders: {
        username: UserStore.getUser().username,
        email: UserStore.getUser().email
      }
    });
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  handleOnChange = (ev) => {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  handleLightModeChange = () => {
    this.setState({
      lightMode: !this.state.lightMode
    });
  }

  handleOnSubmit = () => {
    const fields = { username: this.state.username, email: this.state.email, password: this.state.password };
    console.log('updateUserSettings() !!!', fields);
    Actions.updateUserSettings(fields);
  }

  render() {
    const fields = { username: this.state.username, email: this.state.email, password: this.state.password };

    return (
      <div className="settings">
        <div className="user-signup">
          <h1>Settings</h1>
          <h3>Change User Details</h3>

          <Form
            validate={ true }
            fields={ fields }
            onSubmit={ this.handleOnSubmit }
          >
            <TextField
              label='Username'
              name='username'
              type='text'
              placeholder={ this.state.placerholders.username }
              value={ this.state.username }
              onChange={ this.handleOnChange }
            />

            <TextField
              label='Email'
              name='email'
              type='text'
              placeholder={ this.state.placerholders.email }
              value={ this.state.email }
              onChange={ this.handleOnChange }
            />

            <TextField
              label='Password'
              name='password'
              type='password'
              placeholder='password'
              value={ this.state.password }
              onChange={ this.handleOnChange }
            />
          </Form>
        </div>

        <FlashMessage />
      </div>
    );
  }
}

export default Settings;