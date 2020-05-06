import React from 'react';

// No props.
// const propTypes = {};

const Footer = () => {
  return (
    <footer data-test='footer' className="footer">
      <div className="footer-copyright">© 2020 Copyright:
        <a data-test='author-link' href="https://github.com/alexbuchan"> alex.buchan@telefonica.net</a>
      </div>
    </footer>
  );
}

// Footer.propTypes = propTypes;
export default Footer;
