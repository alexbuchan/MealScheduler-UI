import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  month: PropTypes.string,
  year: PropTypes.number,
  handleMoveForwardOneMonth: PropTypes.func,
  handleMoveBackwardOneMonth: PropTypes.func
};

const ScheduleNavbar = ({ month, year, handleMoveForwardOneMonth, handleMoveBackwardOneMonth }) => {
  return (
    <div className='schedule-navbar'>
      <p className='invisible-wrapper'></p>
      <div className='select-month-wrapper'>
        <button onClick={ handleMoveBackwardOneMonth }>{ '<=' }</button>
        <p>{ month } { year }</p>
        <button onClick={ handleMoveForwardOneMonth }>{ '=>' }</button>
      </div>
      <div className='create-event-wrapper'>
        <button>Create Event</button>
      </div>
    </div>
  );
}

ScheduleNavbar.propTypes = propTypes;
export default ScheduleNavbar;