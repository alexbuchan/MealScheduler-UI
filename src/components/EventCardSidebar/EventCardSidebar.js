import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  event: PropTypes.object,
  accordionEffect: PropTypes.bool
};

class EventCardSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      togglePanel: false
    }

    this.date = (this.props.event.date) ? new Date(this.props.event.date) : new Date;
  }

  eventRecipes = () => {
    if (this.props.event.event_type) {
      return (
        <div className='event-card-sidebar-data'>
          <p className='event-card-sidebar-recipe-label'>Recipes:</p>
          <div className='event-card-sidebar-recipes'>
            { this.props.event.recipes.map((recipe, index) => <a key={ index } href='#' className='event-card-sidebar-recipe-link'>{ recipe.name }</a>) }
          </div>
        </div>
      );
    }

    return null;
  }

  eventComments = () => {
    return (
      <div className='event-card-sidebar-comments-wrapper'>
        <p className='event-card-sidebar-comments'>{ this.props.event.comments }</p>
      </div>
    );
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
      return this.props.event.event_type.charAt(0).toUpperCase() + this.props.event.event_type.slice(1).toLowerCase();
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
        <div onClick={ this.togglePanel } className={`event-card-sidebar-title-wrapper ${this.eventCardAccordionEffect('tab')}`}>
          <div className='event-card-sidebar-invisible-area'>
          </div>

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

        <div className={`event-card-sidebar-panel ${this.eventCardAccordionEffect('panel')}`}>
          { this.eventComments() }
          { this.eventRecipes() }
        </div>
      </div>
    );
  }
}

EventCardSidebar.defaultProps = {
  title: true,
  accordionEffect: false
}

EventCardSidebar.propTypes = propTypes;
export default EventCardSidebar;

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