import React from 'react';
import PropTypes from 'prop-types';
import EventCardPopup from '../../../../EventCardPopup/EventCardPopup';
// import Popup from '../../../../Popup/Popup';
import { Popup } from 'semantic-ui-react'

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

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openPopup: false,
      event: {},
      eventComponentPosition: {}
    }
  }

  componentDidMount() {
    this.setState({ eventComponentPosition: this.componentRef.getBoundingClientRect() });
  }

  openPopup = (event) => {
    this.setState({ openPopup: true, event });
  }

  closePopup = () => {
    this.setState({ openPopup: false });
  }

  eventColor = () => {
    switch(this.props.event.event_type) {
      case 'FOOD':
        return 'food-event-color';
      case 'COOKING':
        return 'cooking-event-color';
      case 'SHOPPING':
        return 'shopping-event-color';
    }
  }

  popupComponentPosition = () => {
    const leftScreen = window.innerWidth * 0.543;
    const topScreen = window.innerHeight * 0.74;

    if (this.state.eventComponentPosition.top <= topScreen) {
      if (this.state.eventComponentPosition.left <= leftScreen) {
        return 'top Screen';
      }

      if (this.state.eventComponentPosition.left > leftScreen) {
        return 'top right';
      }
    }

    if (this.state.eventComponentPosition.top > topScreen) {
      if (this.state.eventComponentPosition.left <= leftScreen) {
        return 'bottom left';
      }

      if (this.state.eventComponentPosition.left > leftScreen) {
        return 'bottom right';
      }
    }

    return null;
  }

  renderEvent = () => {
    return (
      <div className='event-component' ref={ ref => this.componentRef = ref }>
        <div
          className={ `event-click event-title ${this.eventColor()}` }
          onMouseEnter={ () => this.openPopup(this.props.event) }
          onMouseLeave={ this.closePopup }
        >
          { this.props.event.title }
        </div>
      </div>
    );
  }

  render() {
    return (
      <Popup
        open={ this.state.openPopup }
        trigger={ this.renderEvent() }
        content={ <EventCardPopup event={ this.state.event }/> }
        wide='very'
        style={ { margin: '10px 0 10px 0', padding: '10px 0 10px 0', border: 'none' } }
        position={ this.popupComponentPosition() }
      />
    );
  }
}

Event.propTypes = propTypes;
export default Event;