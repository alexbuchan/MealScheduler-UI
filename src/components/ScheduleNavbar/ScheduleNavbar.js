import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  month: PropTypes.string,
  year: PropTypes.number,
  handleMoveOneMonth: PropTypes.func
};

const ScheduleNavbar = ({ month, year, handleMoveOneMonth }) => {
  return (
    <div className='schedule-navbar'>
      <p className='invisible-wrapper'></p>
      <div className='select-month-wrapper'>
        <button onClick={ () => handleMoveOneMonth('backward') }>{ '<=' }</button>
        <p>{ month } { year }</p>
        <button onClick={ () => handleMoveOneMonth('forward') }>{ '=>' }</button>
      </div>
      <div className='create-event-wrapper'>
        <button>Create Event</button>
      </div>
    </div>
  );
}

ScheduleNavbar.propTypes = propTypes;
export default ScheduleNavbar;