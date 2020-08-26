import React from 'react';
import PropTypes from 'prop-types';
import EventCardSidebar from '../EventCardSidebar/EventCardSidebar';
import CloseIcon from '../../assets/images/svg/return.svg';

const propTypes = {
  day: PropTypes.shape({
    active: PropTypes.bool,
    date: PropTypes.string,
    day: PropTypes.number,
    day_name: PropTypes.string,
    events: PropTypes.array
  }),
  visible: PropTypes.bool,
  closeSidebar: PropTypes.func
};

class ScheduleSidebar extends React.Component {
  date = (this.props.day.date) ? new Date(this.props.day.date) : new Date;

  sidebarVisibility = () => {
    if (this.props.visible) {
      return 'schedule-sidebar-visible';
    }

    return 'schedule-sidebar-hidden';
  }

  closeButtonVisibility = () => {
    if (this.props.visible) {
      return 'schedule-sidebar-close-button-visible';
    }

    return 'schedule-sidebar-close-button-hidden';
  }

  handleCloseSidebar = (ev) => {
    ev.preventDefault();
    this.props.closeSidebar();
  }

  displayEvents = () => {
    if (!(Object.values(this.props.day).length === 0) && !(this.props.day.events.length === 0)) {
      return this.props.day.events.map((event, index) => {
        return <EventCardSidebar key={ index } event={ event } accordionEffect={ true } />;
      });
    }

    return <p className='no-events-to-display'>No events to display</p>;
  }

  getDateMonthName = () => {
    if (!(Object.values(this.props.day).length === 0)) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      return monthNames[this.date.getMonth()];
    }

    return null;
  }

  getDayName = () => {
    if (!(Object.values(this.props.day).length === 0)) {
      return this.props.day.day_name.toUpperCase();
    }

    return null;
  }

  getDateYear = () => {
    if (!(Object.values(this.props.day).length === 0)) {
      return this.date.getFullYear();
    }

    return null;
  }

  render() {
    return (
      <div className={ this.sidebarVisibility() }>
        <div className='schedule-sidebar-header-wrapper'>
          <div className='schedule-sidebar-close-button-wrapper'>
            <button onClick={ this.handleCloseSidebar } className={ this.closeButtonVisibility() }>
              <CloseIcon className='schedule-sidebar-close-icon' />
            </button>
          </div>

          <div className='schedule-sidebar-title-wrapper'>
            <div className='schedule-sidebar-title'>
              <div className='schedule-sidebar-day-number-wrapper'>
                <h3 className='schedule-sidebar-day-number'>{ this.props.day.day }</h3>
              </div>

              <div className='schedule-sidebar-date-wrapper'>
                <h3 className='schedule-sidebar-date-day-name'>{ this.getDayName() }</h3>
                <h4 className='schedule-sidebar-month-year-and-time'>{ this.getDateMonthName() } { this.getDateYear() }</h4>
              </div>
            </div>
          </div>

          <div className='invisible-wrapper'></div>
        </div>

        <div className='schedule-sidebar-body'>
          { this.displayEvents() }
        </div>
      </div>
    );
  }
}

ScheduleSidebar.propTypes = propTypes;
export default ScheduleSidebar;