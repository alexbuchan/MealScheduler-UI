import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  day: PropTypes.shape({
    active: PropTypes.bool,
    date: PropTypes.string,
    day: PropTypes.number,
    day_name: PropTypes.string,
    events: PropTypes.array
  })
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

  render() {
    return (
      <div className={ `day-container${this.postpendClassNameActiveness()}` }>
        <div className={ `title-wrapper${this.postpendClassNameActiveness()}` }>
          <div className={ `day-of-the-week-wrapper${this.postpendClassNameActiveness()}` }>
            <p className={ `day-of-the-week${this.postpendClassNameActiveness()}` }>{ this.props.day.day }</p>
          </div>
          <div className={ `day-of-the-week-name-wrapper${this.postpendClassNameActiveness()}` }>
            <p className={ `day-of-the-week-name${this.postpendClassNameActiveness()}` }>{ this.props.day.day_name }</p>
          </div>
        </div>
      </div>
    );
  }
}

DayContainer.propTypes = propTypes;
export default DayContainer;