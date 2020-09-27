import React from 'react';

// ACTIONS
import Actions from '../../actions/settings/SettingsActions';
import AppActions from '../../actions/app/AppActions';

// STORES
import UserStore from '../../stores/UserStore/UserStore';

// COMPONENTS
import Form from '../../components/Form/Form';
import TextField from '../../components/formComponents/TextField/TextField';
// import FlashMessage from '../../components/FlashMessage/FlashMessage';
import { Dropdown } from 'semantic-ui-react';

// TRANSLATIONS
import translations from './translations.json';
import { translate } from '../../lib/i18n/i18n';
let t = translate(translations);

// Settings View Component
class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      username: UserStore.getUser().username,
      email: UserStore.getUser().email,
      edit: false,
      disableSubmitButton: true
    }

    this.state = this.initialState;
    this.submitted = false;
    this.t = t(props.props.locale);
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

  handleEditClick = (ev) => {
    this.setState({
      edit: true,
      disableSubmitButton: false
    });
  }

  renderEditClick = () => {
    if (!this.state.edit) {
      return <button data-test='edit-button' className="edit-form-button" onClick={ this.handleEditClick }>{ this.t('settings.user_details.form.edit') }</button>;
    }

    return null;
  }

  handleCancelEditClick = (ev) => {
    this.setState(this.initialState);
  }

  renderCancelEditClick = () => {
    if (this.state.edit) {
      return <button data-test='cancel-edit-button' className="cancel-edit-form-button" onClick={ this.handleCancelEditClick }>X</button>;
    }

    return null;
  }

  handleOnChange = (ev) => {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  handleOnSubmit = () => {
    const fields = { username: this.state.username, email: this.state.email };
    Actions.updateUserSettings(fields);
    this.setState(this.initialState);
  }

  handleLocaleChange = (_, { value }) => {
    AppActions.changeLocale(value);
  }

  appLocales = () => {
    return this.props.props.locales
      .sort()
      .map(locale => { return { text: locale, value: locale } });
  }

  render() {
    this.t = t(this.props.props.locale);
    const fields = { username: this.state.username, email: this.state.email };

    return (
      <div className="settings-view">
        <h1 className="settings-header">{ this.t('settings.page_title') }</h1>

        <div className="settings">
          <section className="settings-section">
            <div className='settings-subsection'>
              <div className="subsection-title-wrapper">
                <h4 className="subsection-title">{ this.t('settings.user_details.title') }</h4>
              </div>

              <div className='settings-subsection-body'>
                <div className='user-settings-body-nav'>
                  { this.renderEditClick() }
                  { this.renderCancelEditClick() }
                </div>

                <Form
                disableSubmitButton={ this.state.disableSubmitButton }
                submitButtonLabel={ this.t('settings.user_details.form.submit') }
                validate={ true }
                fields={ fields }
                areRequired={ ['username', 'email'] }
                onSubmit={ this.handleOnSubmit }
                >
                  <TextField
                    label={ this.t('settings.user_details.form.username') }
                    name='username'
                    type='text'
                    value={ this.state.username }
                    disabled={ !this.state.edit }
                    onChange={ this.handleOnChange }
                    isRequired={ true }
                  />

                  <TextField
                    label={ this.t('settings.user_details.form.email') }
                    name='email'
                    type='text'
                    value={ this.state.email }
                    onChange={ this.handleOnChange }
                    disabled={ !this.state.edit }
                    isRequired={ true }
                  />
                </Form>
              </div>
            </div>

            <div className='settings-subsection'>
              <div className="subsection-title-wrapper">
                <h4 className='subsection-title'>{ this.t('settings.change_language.label') }</h4>
              </div>
              <div className='settings-subsection-body'>
                <Dropdown
                  fluid
                  search
                  selection
                  value={ this.props.props.locale }
                  options={ this.appLocales() }
                  onChange={ this.handleLocaleChange }
                  className='settings-change-language-dropdown'
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Settings;