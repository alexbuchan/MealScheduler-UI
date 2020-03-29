import React from 'react';
import ContactActions from '../actions/contact/contact';

class ContactsView extends React.Component {
  constructor(props) {
    super(props);
    ContactActions.getContacts();
  }

  renderContacts = () => {
    if (!(Object.keys(this.props.contacts).length === 0)) {
      return this.props.contacts.map((contact, index) => {
        return (
          <div key={index} className="contact-info">
            <h3>Name: { `${contact.first_name} "${contact.aka}" ${contact.last_name}` }</h3>
            <h3>Age: { contact.age }</h3>
          </div>
        );
      });
    }

    return null;
  }

  render() {
    return (
      <>
        <h1 className="contacts-title">Contacts</h1>
        { this.renderContacts() }
      </>
    );
  }
}

export default ContactsView;