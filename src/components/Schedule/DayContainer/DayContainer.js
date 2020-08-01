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
  numberOfDayContainers: PropTypes.number,
  openSidebar: PropTypes.func
};

class DayContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.day.active
    }
  }

  postpendClassNameActiveness = () => {
    if (this.state.active) {
      return '';
    }

    return '-inactive'
  }

  dynamicHeight = () => {
    if (this.numberOfRows() === 6) {
      return 'height-for-6-rows';
    }

    return 'height-for-5-rows';
  }

  numberOfRows = () => {
    if (this.props.numberOfDayContainers > 35) {
      return 6;
    }

    return 5;
  }

  handleOpenSidebar = (ev) => {
    if (this.props.day.events.length > 0) {
      this.props.openSidebar();
    }
  }

  render() {
    return (
      <div className={ `day-container${this.postpendClassNameActiveness()} ${ this.dynamicHeight() }` }>
        <div onClick={ this.handleOpenSidebar } className={ `title-wrapper${this.postpendClassNameActiveness()}` }>
          <div className={ `day-of-the-week-wrapper${this.postpendClassNameActiveness()}` }>
            <p className={ `day-of-the-week${this.postpendClassNameActiveness()}` }>{ this.props.day.day }</p>
          </div>
        </div>

        <EventContainer events={ this.props.day.events } rows={ this.numberOfRows() } openSidebar={ this.props.openSidebar }/>
      </div>
    );
  }
}

DayContainer.propTypes = propTypes;
export default DayContainer;