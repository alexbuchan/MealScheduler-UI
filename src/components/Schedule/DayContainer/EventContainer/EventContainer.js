import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event/Event';

const propTypes = {
  events: PropTypes.array,
  columns: PropTypes.number,
  openSidebar: PropTypes.func
};

const EventContainer = ({ events, columns, openSidebar }) => {
  let spliced;

  const formatEventQuantity = () => {
    if (columns === 6 && events.length > 4) {
      spliced = true;
      const displayedEvents = [...events]
      return displayedEvents.splice(0, 3);
    }
    if (columns === 5 && events.length > 5) {
      spliced = true;
      const displayedEvents = [...events]
      return displayedEvents.splice(0, 4);
    }

    spliced = false;
    return events;
  }

  const handleOpenSidebar = (ev) => {
    ev.preventDefault();
    openSidebar();
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
      { formatEventQuantity().map(event => <Event key={ event.id } event={ event } />) }
      { renderSpliced() }
    </div>
  );
}

EventContainer.propTypes = propTypes;
export default EventContainer;