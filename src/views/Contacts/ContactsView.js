import React from 'react';
import ContactActions from '../../actions/contact/ContactActions';
import ContactStore from '../../stores/ContactStore/ContactStore';
import Background from '../../components/Background/Background';

class ContactsView extends React.Component {
  constructor() {
    super();

    this.state = {
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
    ContactStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    ContactStore.removeChangeListener(this._onChange);
  }

  renderContactAddress = (contact) => {
    return <ul className="address-list">{ Object.entries(contact.address).map((item, index) => {
      if (item[0] === 'geo') return null;
      const label = item[0].replace(/^\w/, c => c.toUpperCase());
      return (
        <li className="contact-item address-item" key={ index }><strong>{ label }</strong>: { item[1] }</li>
      );
    }) }</ul>
  }

  renderContacts = () => {
    if (!(this.state.contacts.length === 0)) {
      return this.state.contacts.map((contact) => {
        return (
          <ul key={ contact.email } className="contact-info">
            <div className="contact-name-wrapper">
              <h3 className="contact-name">{ contact.name }</h3>
            </div>
            <div className="contact-info-list">
              <li className="contact-item"><strong>Username</strong>: { contact.username }</li>
              <li className="contact-item"><strong>Email</strong>: { contact.email }</li>
              <li className="contact-item"><strong>Address</strong>: { this.renderContactAddress(contact) }</li>
              <li className="contact-item"><strong>Phone</strong>: { contact.phone }</li>
              <li className="contact-item"><strong>Website</strong>: { contact.website }</li>
            </div>
          </ul>
        );
      });
    }

    return null;
  }

  render() {
    return (
      <div className="contacts-view">
        <Background />
        <h1 className="contacts-title">Contacts</h1>
        <div className="contacts-info-wrapper">
          { this.renderContacts() }
        </div>
      </div>
    );
  }
}

export default ContactsView;