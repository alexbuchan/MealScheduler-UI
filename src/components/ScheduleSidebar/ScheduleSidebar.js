import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Transition } from 'semantic-ui-react'

import EventCardSidebarTitle from '../EventCardSidebar/EventCardSidebarTitle';
import EventCardSidebarPanel from '../EventCardSidebar/EventCardSidebarPanel';
import CloseIcon from '../../assets/images/svg/return.svg';


const Title = () => {
  return (
    <div>
      <h1>Title</h1>
      <p>Stuff about the title</p>
    </div>
  )
}

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
  state = {
    activeIndex: [],
    inactiveIndex: []
  }
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

  handleAccordion = (ev, titleProps) => {
    // Prevent event edit and delete buttons from opening accordion
    if(!(ev.target.tagName === 'DIV' || ev.target.tagName === 'H4' || ev.target.tagName === 'H5' || ev.target.tagName === 'P')) return;

    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex;

    const currentIndexPosition = activeIndex.indexOf(index);
    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1);
    } else {
      newIndex.push(index);
    }

    this.setState({ activeIndex: newIndex });
  }

  displayEvents = () => {
    if (!(Object.values(this.props.day).length === 0) && !(this.props.day.events.length === 0)) {
      return this.props.day.events.map((event, index) => {
        const isActive = this.state.activeIndex.includes(index);
        const isInactive = this.state.inactiveIndex.includes(index);
        return (
          <div key={index}>
            <Accordion.Title className='schedule-sidebar-accordion-title' onClick={ this.handleAccordion } index={index}>
              <EventCardSidebarTitle event={ event } />
            </Accordion.Title>
            <Accordion.Content active={isActive}>
            <Transition visible={isActive} animation='drop' duration={500}>
              <EventCardSidebarPanel event={ event }/>
            </Transition>
            </Accordion.Content>
          </div>
        );
        return <EventCardSidebar key={ index } event={ event } accordionEffect={ true } visible={ this.props.visible } />;
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
          <div className='schedule-sidebar-title-wrapper'>
            <div className='schedule-sidebar-title'>
              <div className='schedule-sidebar-date-wrapper'>
                <h3 className='schedule-sidebar-date-day-name'>{ this.getDayName() }</h3>
                <h4 className='schedule-sidebar-month-year-and-time'>{ this.getDateMonthName() } { this.getDateYear() }</h4>
              </div>
              <div className='schedule-sidebar-day-number-wrapper'>
                <h3 className='schedule-sidebar-day-number'>{ this.props.day.day }</h3>
              </div>
            </div>
          </div>

          <div className='schedule-sidebar-close-button-wrapper'>
            <button onClick={ this.handleCloseSidebar } className={ this.closeButtonVisibility() }>
              <CloseIcon className='schedule-sidebar-close-icon' />
            </button>
          </div>
        </div>

        <div className='schedule-sidebar-body'>
          <Accordion>
            { this.displayEvents() }
          </Accordion>
        </div>
      </div>
    );
  }
}

ScheduleSidebar.propTypes = propTypes;
export default ScheduleSidebar;