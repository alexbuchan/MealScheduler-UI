import React from 'react';

const ScheduleHeader = () => {
  const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayColumns = () => {
    return daysOfTheWeek.map((day, index) => {
      return (
        <div key={index} className='day-column'>
          <p>{ day }</p>
        </div>
      );
    });
  }

  return (
    <div className='schedule-info-header'>
      { dayColumns() }
    </div>
  );
}

export default ScheduleHeader;