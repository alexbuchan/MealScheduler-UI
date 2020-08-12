import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  event: PropTypes.shape({
    active: PropTypes.bool,
    date: PropTypes.string,
    day: PropTypes.number,
    day_name: PropTypes.string,
    events: PropTypes.array
  }),
  openPopup: PropTypes.func
};

const Event = ({ event, openPopup }) => {
  const eventColor = () => {
    switch(event.event_type) {
      case 'FOOD':
        return 'food-event-color';
      case 'COOKING':
        return 'cooking-event-color';
      case 'SHOPPING':
        return 'shopping-event-color';
    }
  }

  return (
    <p className={ `event-click event-title ${eventColor()}` } onClick={ () => openPopup(event) }>{ event.title }</p>
  );
}

Event.propTypes = propTypes;
export default Event;