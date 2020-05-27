import React from 'react';
import ContactActions from '../../actions/contact/ContactActions';
import ContactStore from '../../stores/ContactStore/ContactStore';
import Contacts from '../../components/Contacts/Contacts';
import Background from '../../components/Background/Background';
import withLoader from '../../HOC/Loader/Loader';

class ContactsView extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      contacts: ContactStore.getContactState().contacts
    }
  }

  _onChange = () => {
    this.setState({
      contacts: ContactStore.getContactState().contacts
    });
  }

  componentDidMount() {
    ContactActions.getContacts();
    ContactStore.addChangeListener(this._onChange);
  }

  componentDidUpdate() {
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    ContactStore.removeChangeListener(this._onChange);
  }

  render() {
    const ContactsWithLoader = withLoader(Contacts);
    return (
      <div className="contacts-view">
        <Background />
        <h1 className="contacts-title">Contacts</h1>
        <div className="contacts-info-wrapper">
          <ContactsWithLoader
            isLoading={ this.state.isLoading } 
            contacts={ this.state.contacts }
            loaderClassName="contacts-loader"
          />
        </div>
      </div>
    );
  }
}

export default ContactsView;