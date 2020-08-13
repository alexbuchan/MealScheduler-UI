import React from 'react';
import PropTypes from 'prop-types';
import EventCard from '../EventCard/EventCard';

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
    if (!(Object.values(this.props.day).length === 0)) {
      return this.props.day.events.map((event, index) => {
        return <EventCard key={ index } event={ event } />;
      });
    }

    return null;
  }

  render() {
    return (
      <div className={ this.sidebarVisibility() }>
        <div className='schedule-sidebar-header-wrapper'>
          <div className='invisible-wrapper'></div>
          <div className='schedule-sidebar-title-wrapper'>
            <h3>{ this.props.day.day_name } { this.props.day.day }</h3>
          </div>
          <div className='schedule-sidebar-close-button-wrapper'>
            <button onClick={ this.handleCloseSidebar } className={ this.closeButtonVisibility() }>X</button>
          </div>
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