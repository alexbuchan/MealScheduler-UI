import React from 'react';
import PropTypes from 'prop-types';
import ContactAddress from './ContactAddress/ContactAddress';

const propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
    phone: PropTypes.string,
    website: PropTypes.string
  })
};

const ContactCard = ({ contact }) => {
  const renderContactAddress = (contact) => {
    const contactAddress = Object.entries(contact.address);
    return (
      <ul className="address-list">{
        contactAddress.map((item, index) => <ContactAddress key={ index } item={ item } />) 
      }</ul>
    );
  }

  return (
    <ul className="contact-info">
      <div className="contact-name-wrapper">
        <h3 className="contact-name">{ contact.name }</h3>
      </div>

      <div className="contact-info-list">
        <li className="contact-item"><strong>Username</strong>: { contact.username }</li>
        <li className="contact-item"><strong>Email</strong>: { contact.email }</li>
        <li className="contact-item"><strong>Address</strong>: { renderContactAddress(contact) }</li>
        <li className="contact-item"><strong>Phone</strong>: { contact.phone }</li>
        <li className="contact-item"><strong>Website</strong>: { contact.website }</li>
      </div>
    </ul>
  );
}

ContactCard.propTypes = propTypes;
export default ContactCard;