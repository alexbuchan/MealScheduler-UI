import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const propTypes = {
  event: PropTypes.object
};

class EventCardPopup extends React.Component {
  constructor(props) {
    super(props);
    this.date = (this.props.event.date) ? new Date(this.props.event.date) : new Date;
  }

  eventRecipes = () => {
    if (this.props.event.event_type) {
      return (
        <div className='event-data'>
          <p className='event-recipe-label'>Recipes:</p>
          <div className='event-recipes'>
            { this.props.event.recipes.map((recipe, index) => <Link key={ index } to={ `/recipes/${recipe.id}` } className='recipe-link'>{ recipe.name }</Link>) }
          </div>
        </div>
      );
    }

    return null;
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

  dateFrequency = () => {
    if (this.props.event.event_type === 'SHOPPING') {
      return <h5 className='event-card-date-frequency'>{ this.props.event.frequency }</h5>;
    }

    return null;
  }

  render() {
    return (
      <div className='event-card-popup'>
        <div className='event-card-header'>
          <div className='event-date-day-number-wrapper'>
            <h3 className='event-date-day-number'>{ this.getDateDay() }</h3>
          </div>

          <div className='event-date-wrapper'>
            <h3 className='event-date-day-name'>{ this.getDateDayName().toUpperCase() }</h3>
            <h4 className='event-month-year-and-time'>{ this.getDateMonthName() } { this.getDateYear() } | From { this.props.event.begin_at } to { this.props.event.end_at }</h4>
          </div>

          <div className='event-type-border'>
            <p className='event-type'>{ this.formatEventTypeString() }</p>
          </div>
        </div>

        <div className='event-card-body'>
          <div onClick={ this.togglePanel } className='event-title-wrapper'>
            <h5 className='event-card-title'>{ this.props.event.title }</h5>
            { this.dateFrequency() }
          </div>
          { this.eventRecipes() }
        </div>
      </div>
    );
  }
}

EventCardPopup.defaultProps = {
  title: true
}

EventCardPopup.propTypes = propTypes;
export default EventCardPopup;

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