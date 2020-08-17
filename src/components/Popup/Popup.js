import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../../assets/images/svg/close.svg';

const propTypes = {
  open: PropTypes.bool,                   // Parent component state for opening the popup
  closePopup: PropTypes.func,             // closeHandler function
  children: PropTypes.object.isRequired,  // Populate popup with data
  backgroundColor: PropTypes.string,      // Add a background color for popup
  clickToClose: PropTypes.bool            // Adds a clickable X close button to close popup
};

const Popup = ({ open, closePopup, children, backgroundColor, clickToClose }) => {
  const handleClosePopup = (ev) => {
    ev.stopPropagation();
    closePopup(ev);
  }

  const clickToClosePopup = () => {
    if (clickToClose) {
      return (
        <div className='popup-header-wrapper'>
          <div className='popup-button-wrapper'>
            <button className='popup-close-button' onClick={ handleClosePopup }>
              <CloseIcon className='popup-close-icon' />
            </button>
          </div>
        </div>
      );
    }

    return null;
  }

  if (open) {
    return (
      <div className='popup' style={ { backgroundColor } }>
        { clickToClosePopup() }
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