import React from 'react';
import PropTypes from 'prop-types';
import EventContainer from './EventContainer/EventContainer';

const propTypes = {
  day: PropTypes.shape({
    active: PropTypes.bool,
    date: PropTypes.string,
    day: PropTypes.number,
    day_name: PropTypes.string,
    events: PropTypes.array
  }),
  numberOfDayContainers: PropTypes.number
};

class DayContainer extends React.Component {
  state = {
    active: this.props.day.active
  }

  postpendClassNameActiveness = () => {
    if (this.state.active) {
      return '';
    }

    return '-inactive'
  }

  dynamicHeight = () => {
    if (this.props.numberOfDayContainers > 35) {
      return 'height-for-6-columns';
    }

    return 'height-for-5-columns';
  }

  render() {
    return (
      <div className={ `day-container${this.postpendClassNameActiveness()} ${ this.dynamicHeight() }` }>
        <div className={ `title-wrapper${this.postpendClassNameActiveness()}` }>
          <div className={ `day-of-the-week-wrapper${this.postpendClassNameActiveness()}` }>
            <p className={ `day-of-the-week${this.postpendClassNameActiveness()}` }>{ this.props.day.day }</p>
          </div>
          <div className={ `day-of-the-week-name-wrapper${this.postpendClassNameActiveness()}` }>
            <p className={ `day-of-the-week-name${this.postpendClassNameActiveness()}` }>{ this.props.day.day_name }</p>
          </div>
        </div>

        <EventContainer events={ this.props.day.events }/>
      </div>
    );
  }
}

DayContainer.propTypes = propTypes;
export default DayContainer;