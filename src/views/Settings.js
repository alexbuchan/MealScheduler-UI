import React from 'react';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import Checkbox from '../components/Checkbox/Checkbox';
// import Actions from '../actions/Settings/Settings';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      lightMode: false
    }

    this.submitted = false;
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

  handleOnSubmit = (fields) => {
    console.log('updateUserSettings() !!!');
    // Actions.updateUserSettings(fields);
  }

  render() {
    return (
      <>
        <h1>Settings</h1>
        <Form
          fields={ this.state }
          onSubmit={ this.handleOnSubmit }
        >
          <Input
            label='Username'
            name='username'
            type='text'
            value={ this.state.username }
            onChange={ this.handleOnChange }
          />

          <Checkbox 
            label='Dark/Light Mode'
            name='lightMode'
            type='checkbox'
            value={ this.state.lightMode }
            onChange={ this.handleLightModeChange }
          />
        </Form>
      </>
    );
  }
}

export default Settings;