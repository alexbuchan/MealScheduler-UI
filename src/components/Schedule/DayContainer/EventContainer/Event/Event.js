import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  event: PropTypes.shape({
    active: PropTypes.bool,
    date: PropTypes.string,
    day: PropTypes.number,
    day_name: PropTypes.string,
    events: PropTypes.array
  })
};

const Event = ({ event }) => {
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
    <p className={ `event-title ${eventColor()}` }>{ event.title }</p>
  );
}

Event.propTypes = propTypes;
export default Event;