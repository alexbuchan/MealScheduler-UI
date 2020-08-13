import React from 'react';
import PropTypes from 'prop-types';
import DayContainer from './DayContainer/DayContainer';
import EventCard from '../EventCard/EventCard';
import Popup from '../Popup/Popup';

const propTypes = {
  schedule: PropTypes.array,
  openSidebar: PropTypes.func
};

class Schedule extends React.Component {
  state = {
    openPopup: false,
    event: {}
  }

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

  openPopup = (event) => {
    this.setState({ openPopup: true, event });
  }

  closePopup = () => {
    this.setState({ openPopup: false });
  }

  popupColor = () => {
    switch(this.state.event.event_type) {
      case 'FOOD':
        return '#4fd44fEE';
      case 'SHOPPING':
        return '#e85f5fEE';
      default:
        return 'gray';
    }
  }

  render() {
    return (
      <div className="schedule-info-body">
        { this.scheduleDayContainers() }
        <div className="popup-schedule-info-body">
          <Popup
            open={ this.state.openPopup }
            closePopup={ this.closePopup }
            backgroundColor={ this.popupColor() }
          >
            <EventCard event={ this.state.event } />
          </Popup>
        </div>
      </div>
    );
  }
}

Schedule.propTypes = propTypes;
export default Schedule;