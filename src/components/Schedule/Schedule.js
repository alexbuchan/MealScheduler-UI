import React from 'react';
import PropTypes from 'prop-types';
import DayContainer from './DayContainer/DayContainer';

const propTypes = {
  schedule: PropTypes.array,
  openSidebar: PropTypes.func
};

const Schedule = ({ schedule, openSidebar }) => {
  const scheduleDayContainers = () => {
    if (!(schedule.length === 0)) {
      return schedule.map((day) => {
        return <DayContainer key={ day.date } day={ day } numberOfDayContainers={ schedule.length } openSidebar={ openSidebar } />;
      });
    }

    return null;
  }

  return (
    <div className="schedule-info-body">
      { scheduleDayContainers() }
    </div>
  );
}

Schedule.propTypes = propTypes;
export default Schedule;