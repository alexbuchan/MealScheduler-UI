import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../../assets/images/svg/close.svg';

const propTypes = {
  closePopup: PropTypes.func.isRequired,
  accordionEffect: PropTypes.bool,
  children: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string
};

const Popup = ({ open, closePopup, children, backgroundColor }) => {
  const handleClosePopup = (ev) => {
    ev.stopPropagation();
    closePopup(ev);
  }

  if (open) {
    return (
      <div className='popup' style={ { backgroundColor } }>
        <div className='popup-header-wrapper'>
          <div className='popup-button-wrapper'>
            <button className='popup-close-button' onClick={ handleClosePopup }>
              <CloseIcon className='popup-close-icon' />
            </button>
          </div>
        </div>
        <div>
          { children }
        </div>
      </div>
    );
  }

  return null;
}

Popup.propTypes = propTypes;
export default Popup;