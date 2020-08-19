import React from 'react';
import PropTypes from 'prop-types';
import EventCardPopup from '../../../../EventCardPopup/EventCardPopup';
import Popup from '../../../../Popup/Popup';

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
    this.setState({
      eventComponentPosition: this.eventComponentRef.getBoundingClientRect()
    });
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

  render() {
    return (
      <div className='event-component' ref={ ref => this.eventComponentRef = ref }>
        <div
          className={ `event-click event-title ${this.eventColor()}` }
          onMouseEnter={ () => this.openPopup(this.props.event) }
          onMouseLeave={ this.closePopup }
        >
          { this.props.event.title }
          <div className="popup-schedule-info-body">
              <Popup
                open={ this.state.openPopup }
                backgroundColor='lightGray'
                parentComponentPosition={ this.state.eventComponentPosition }
              >
                <EventCardPopup event={ this.state.event }/>
              </Popup>
            </div>
        </div>
      </div>
    );
  }
}

Event.propTypes = propTypes;
export default Event;