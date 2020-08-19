import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../../assets/images/svg/close.svg';

const propTypes = {
  open: PropTypes.bool,                     // Parent component state for opening the popup
  closePopup: PropTypes.func,               // closeHandler function
  children: PropTypes.object.isRequired,    // Populate popup with data
  clickToClose: PropTypes.bool,             // Adds a clickable X close button to close popup
  eventComponentPosition: PropTypes.object
};

const Popup = ({ open, closePopup, children, clickToClose, parentComponentPosition }) => {
  let side;

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
        side = 'topLeft';
        styles = {
          transform: `translate(${parentComponentPosition.width - 23}px, 0px)`
        };
      }

      // Top Right
      if (parentComponentPosition.left > 711) {
        side = 'topRight';
        styles = {
          transform: `translate(calc(-100% + 23px), 0px)`
        };
      }
    }

    // Bottom
    if (parentComponentPosition.top > 611) {
      // Bottom Left
      if (parentComponentPosition.left < 710) {
        side = 'bottomLeft';
        styles = {
          transform: `translate(${parentComponentPosition.width - 23}px, calc(-100% - ${parentComponentPosition.height}px))`
        };
      }

      // Bottom Right
      if (parentComponentPosition.left > 711) {
        side = 'bottomRight';
        styles = {
          transform: `translate(calc(-100% + 23px), calc(-100% - ${parentComponentPosition.height}px))`
        };
      }
    }

    styles.transition = `150ms transform`
    return styles;
  }

  const trianglePopupPosition = (side) => {
    let styles;

    if (side === 'topLeft') {
      styles = {
        textAlign: 'left', textShadow: "black 0px -2px 14px"
      };
    }

    if (side === 'topRight') {
      styles = {
        textAlign: 'right', textShadow: "black 0px -2px 14px"
      };
    }

    if (side === 'bottomLeft') {
      styles = {
        textAlign: 'left', textShadow: "black 0px 10px 14px"
      };
    }

    if (side === 'bottomRight') {
      styles = {
        textAlign: 'right', textShadow: "black 0px 10px 14px"
      };
    }

    return styles;
  }

  const trianglePopupTop = (side) => {
    if (side === 'topLeft' || side === 'topRight') {
      return <div className='popup-triangle' style={ trianglePopupPosition(side) }>▲</div>;
    }
  }

  const trianglePopupBottom = (side) => {
    if (side === 'bottomLeft' || side === 'bottomRight') {
      return <div className='popup-triangle' style={ trianglePopupPosition(side) }>▼</div>;
    }
  }

  if (open) {
    return (
      <div className='popup' style={ popupComponentPosition() }>
        { trianglePopupTop(side) }
        { clickToClosePopup() }
        <div>
          { children }
        </div>
        { trianglePopupBottom(side) }
      </div>
    );
  }

  return null;
}

Popup.propTypes = propTypes;
export default Popup;
