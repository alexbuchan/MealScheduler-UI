import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.arrayOf(PropTypes.string) // The identifier and value for parts of an address
};

const ContactAddress = ({ index, item }) => {
  const label = item[0].replace(/^\w/, c => c.toUpperCase());

  return (
    <li className="contact-item address-item" ><strong>{ label }</strong>: { item[1] }</li>
  );
}

ContactAddress.propTypes = propTypes;
export default ContactAddress;