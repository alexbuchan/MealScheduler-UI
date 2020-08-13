import React from 'react';

const Popup = ({ open, closePopup, children, backgroundColor, title }) => {
  const handleClosePopup = (ev) => {
    ev.stopPropagation();
    closePopup(ev);
  }

  const popupTitle = () => {
    if (popupTitle) {
      return (
        <div className='popup-title-wrapper'>
          <h3 className='popup-title'>{ title }</h3>
        </div>
      );
    }

    return null;
  }

  if (open) {
    return (
      <div className='popup' style={ { backgroundColor } }>
        <div className='popup-header-wrapper'>
          <div className='invisible-wrapper'></div>
          { popupTitle() }
          <div className='popup-button-wrapper'>
            <button className='popup-button' onClick={ handleClosePopup }>X</button>
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

export default Popup;