import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../../assets/images/svg/close.svg';

const propTypes = {
  open: PropTypes.bool,                   // Parent component state for opening the popup
  closePopup: PropTypes.func,             // closeHandler function
  children: PropTypes.object.isRequired,  // Populate popup with data
  backgroundColor: PropTypes.string,      // Add a background color for popup
  clickToClose: PropTypes.bool,            // Adds a clickable X close button to close popup
  eventComponentPosition: PropTypes.object
};

const Popup = ({ open, closePopup, children, backgroundColor, clickToClose, parentComponentPosition }) => {
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

  const popupComponentPosition = () => {
    let styles;
    // Top
    if (parentComponentPosition.top < 610) {
      // Top Left
      if (parentComponentPosition.left < 710) {
        console.log('Top left popup. Down bottom and to the right!');
        styles = {
          transform: `translate(${parentComponentPosition.width - 23}px, 0px)`
        };
      }

      // Top Right
      if (parentComponentPosition.left > 711) {
        console.log('Top right popup. Down bottom and to the left!');
        styles = {
          transform: `translate(calc(-100% + 23px), 0px)`
        };
      }
    }

    // Bottom
    if (parentComponentPosition.top > 611) {
      // Bottom Left
      if (parentComponentPosition.left < 710) {
        console.log('Bottom left popup. Up top and to the right!');
        styles = {
          transform: `translate(${parentComponentPosition.width - 23}px, calc(-100% - ${parentComponentPosition.height}px))`
        };
      }

      // Bottom Right
      if (parentComponentPosition.left > 711) {
        console.log('Bottom left popup. Up top and to the left!');
        styles = {
          transform: `translate(calc(-100% + 23px), calc(-100% - ${parentComponentPosition.height}px))`
        };
      }
    }


    return styles;
  }

  if (open) {
    return (
      <div className='popup' style={ { backgroundColor, ...popupComponentPosition() } }>
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
