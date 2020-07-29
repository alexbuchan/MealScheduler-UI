import React from 'react';
import PropTypes from 'prop-types';
import DayContainer from './DayContainer/DayContainer';

const propTypes = {
  schedule: PropTypes.array,
  openSidebar: PropTypes.func
};

const Schedule = ({ schedule, openSidebar }) => {
  if (!(schedule.length === 0)) {
    return schedule.map((day) => {
      return <DayContainer key={ day.date } day={ day } numberOfDayContainers={ schedule.length } openSidebar={ openSidebar } />
    });
  }

  return null;
}

Schedule.propTypes = propTypes;
export default Schedule;