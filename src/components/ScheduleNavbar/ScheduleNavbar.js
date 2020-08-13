import React from 'react';
import PropTypes from 'prop-types';
import BackwardArrow from '../../assets/images/svg/back.svg';
import ForwardArrow from '../../assets/images/svg/next.svg';
import AddButton from '../../assets/images/svg/plus.svg';

const propTypes = {
  month: PropTypes.string,
  year: PropTypes.number,
  handleMoveOneMonth: PropTypes.func,
  handleOpenModal: PropTypes.func
};

const ScheduleNavbar = ({ month, year, handleMoveOneMonth, handleOpenModal }) => {
  return (
    <div className='schedule-navbar'>
      <p className='invisible-wrapper'></p>
      <div className='select-month-wrapper'>
        <button className='move-button' onClick={ () => handleMoveOneMonth('backward') }>
          <BackwardArrow className='schedule-arrow'/>
        </button>

        <h3 className='month-and-year-display'>{ month } { year }</h3>

        <button className='move-button' onClick={ () => handleMoveOneMonth('forward') }>
          <ForwardArrow className='schedule-arrow'/>
        </button>
      </div>
      <div className='create-event-wrapper'>
        <div className='create-event'>
          <p className='create-event-label'>Create Event</p>
          <button onClick={ handleOpenModal } className='create-event-button'><AddButton className='create-event-icon' /></button>
        </div>
      </div>
    </div>
  );
}

ScheduleNavbar.propTypes = propTypes;
export default ScheduleNavbar;