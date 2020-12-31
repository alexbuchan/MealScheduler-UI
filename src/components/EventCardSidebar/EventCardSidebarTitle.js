import React from 'react';
import PropTypes from 'prop-types';

import EditIcon from '../../assets/images/svg/pen.svg';
import DeleteIcon from '../../assets/images/svg/delete.svg';

const propTypes = {
  event: PropTypes.object,
  accordionEffect: PropTypes.bool,
  handleOpenEditEventModal: PropTypes.func
};

class EventCardSidebarTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      togglePanel: false
    }

    this.date = (this.props.event.date) ? new Date(this.props.event.date) : new Date;
  }

  eventCardAccordionEffect = (type) => {
    if (this.props.accordionEffect) {
      if (type === 'tab') return 'event-card-sidebar-accordion';
      if (type === 'panel') {
        if (this.state.togglePanel === false) return 'event-card-sidebar-panel';
        if (this.state.togglePanel === true) return 'event-card-sidebar-panel-visible';
      }
    }

    return '';
  }

  getDateDay = () => {
    return ('0' + this.date.getDate()).slice(-2);
  }

  getDateDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[this.date.getDay()];
  }

  getDateMonthName = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[this.date.getMonth()];
  }

  getDateYear = () => {
    return this.date.getFullYear();;
  }

  formatEventTypeString = () => {
    if (this.props.event.event_type) {
      return this.props.event.event_type.replace(/Event/, '');
    }

    return null;
  }

  togglePanel = () => {
    this.setState({
      togglePanel: !this.state.togglePanel
    });
  }

  render() {
    return (
      <div className='event-card-sidebar'>
        <div className='event-card-sidebar-header-wrapper'>
          <div className='event-card-sidebar-header-buttons'>
            <div className='event-card-sidebar-buttons-wrapper'>
              <button onClick={ (ev) => this.props.handleOpenEditEventModal(ev, this.props.event.id) } className='schedule-sidebar-button'>
                <EditIcon className='schedule-sidebar-icon' />
              </button>
              
              <button onClick={ this.handleCloseSidebar } className='schedule-sidebar-button'>
                <DeleteIcon className='schedule-sidebar-icon' />
              </button>
            </div>
          </div>

          <div className='event-card-sidebar-title-wrapper'>
            <div className='event-card-sidebar-title-center'>
              <h5 className='event-card-sidebar-title'>{ this.props.event.title }</h5>
              <div className='event-card-sidebar-date-wrapper'>
                <h4 className='event-card-sidebar-month-year-and-time'>From { this.props.event.begin_at } to { this.props.event.end_at }</h4>
              </div>
            </div>

            <div className='event-type-border'>
              <p className='event-type'>{ this.formatEventTypeString() }</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventCardSidebarTitle.defaultProps = {
  title: true,
  accordionEffect: false
}

EventCardSidebarTitle.propTypes = propTypes;
export default EventCardSidebarTitle;

// begin_at: "09:00"
// comments: "One hell of a breakfast"
// created_at: "2020-07-29T10:23:19.598Z"
// date: "2020-08-06"
// end_at: "09:30"
// event_type: "FOOD"
// event_type_id: 1
// id: 10
// recipe: {id: 1, name: "Ham Sandwich", steps: "step1-Grab 2 bits of bread-step2-Grab 2 slices of …of ham between the 2 slices of bread-step4-Enjoy!", preparation_time: 5, cooking_time: 0, …}
// title: "Breakfast at Tiffany's"
// updated_at: "2020-07-29T10:23:19.598Z"
// user_id: 1