import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event/Event';

const propTypes = {
  events: PropTypes.array
};

const EventContainer = ({ events }) => {
  const formatEventQuantity = () => {
    if (events.length > 5) {
      return events.splice(0, 5);
    }

    return events;
  }

  return (
    <div className='events-wrapper'>
      { events.map(event => <Event key={ event.id } event={ event } />) }
    </div>
  );
}

EventContainer.propTypes = propTypes;
export default EventContainer;