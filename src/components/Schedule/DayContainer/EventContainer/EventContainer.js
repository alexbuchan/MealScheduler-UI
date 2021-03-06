import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event/Event';

const propTypes = {
  day: PropTypes.shape({
    active: PropTypes.bool,
    date: PropTypes.string,
    day: PropTypes.number,
    day_name: PropTypes.string,
    events: PropTypes.array
  }),
  rows: PropTypes.number,
  openSidebar: PropTypes.func,
  openPopup: PropTypes.func
};

const EventContainer = ({ day, rows, openSidebar, openPopup }) => {
  let spliced;
  let events = day.events;

  const formatEventQuantity = () => {
    if (rows === 6 && events.length > 4) {
      spliced = true;
      const displayedEvents = [...events]
      return displayedEvents.splice(0, 3);
    }
    if (rows === 5 && events.length > 5) {
      spliced = true;
      const displayedEvents = [...events]
      return displayedEvents.splice(0, 4);
    }

    spliced = false;
    return events;
  }

  const handleOpenSidebar = (ev) => {
    ev.preventDefault();
    openSidebar(day);
  }

  const renderSpliced = () => {
    if (spliced) {
      return (
        <div onClick={ handleOpenSidebar } className='more-events'>
          <p>...</p>
        </div>
      );
    }

    return null;
  }

  return (
    <div className='events-wrapper'>
      { formatEventQuantity().map(event => <Event key={ event.id } event={ event } openPopup={ openPopup } />) }
      { renderSpliced() }
    </div>
  );
}

EventContainer.propTypes = propTypes;
export default EventContainer;