import React from 'react';
import PropTypes from 'prop-types';
import DayContainer from './DayContainer/DayContainer';

const propTypes = {
  schedule: PropTypes.array
};

const Schedule = ({ schedule }) => {
  if (!(schedule.length === 0)) {
    return schedule.map((day) => {
      return <DayContainer key={ day.date } day={ day } />
    });
  }

  return null;
}

Schedule.propTypes = propTypes;
export default Schedule;