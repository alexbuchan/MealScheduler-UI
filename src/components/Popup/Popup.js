import React from 'react';

const Popup = ({ open, closePopup, children, backgroundColor }) => {
  const handleClosePopup = (ev) => {
    ev.stopPropagation();
    closePopup(ev);
  }

  if (open) {
    return (
      <div className='popup' style={ { backgroundColor } }>
        <div className='popup-button-wrapper'>
          <button onClick={ handleClosePopup }>X</button>
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