import React from 'react';
import PropTypes from 'prop-types';
import ContactCard from './ContactCard/ContactCard';

const propTypes = {
  contacts: PropTypes.array
};

const Contacts = ({ contacts }) => {
  if (!(contacts.length === 0)) {
    return contacts.map((contact) => {
      return <ContactCard key={ contact.email } contact={ contact } />
    });
  }

  return null;
}

Contacts.propTypes = propTypes;
export default Contacts;