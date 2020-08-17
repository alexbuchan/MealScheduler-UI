import React from 'react';
import PropTypes from 'prop-types';
import DayContainer from './DayContainer/DayContainer';

const propTypes = {
  schedule: PropTypes.array,
  openSidebar: PropTypes.func
};

class Schedule extends React.Component {
  scheduleDayContainers = () => {
    if (!(this.props.schedule.length === 0)) {
      return this.props.schedule.map((day) => {
        return (
          <DayContainer
            key={ day.date }
            day={ day }
            numberOfDayContainers={ this.props.schedule.length }
            openSidebar={ this.props.openSidebar }
            openPopup={ this.openPopup }
          />
        );
      });
    }

    return null;
  }

  render() {
    return (
      <div className="schedule-info-body">
        { this.scheduleDayContainers() }
      </div>
    );
  }
}

Schedule.propTypes = propTypes;
export default Schedule;