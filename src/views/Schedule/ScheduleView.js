import React from 'react';
import PropTypes from 'prop-types';

import Background from '../../components/Background/Background';
import ScheduleActions from '../../actions/schedule/ScheduleActions';
import ScheduleStore from '../../stores/ScheduleStore/ScheduleStore';
import Schedule from '../../components/Schedule/Schedule';
import ScheduleSidebar from '../../components/ScheduleSidebar/ScheduleSidebar';
import ScheduleNavbar from '../../components/ScheduleNavbar/ScheduleNavbar';
import withLoader from '../../HOC/Loader/Loader';

const propTypes = {};

class ScheduleView extends React.Component {
  constructor() {
    super();

    this.loadingTime = 500;
    this.state = {
      isLoading: false,
      schedule: ScheduleStore.getScheduleState(),
      sidebarActive: false
    }
  }

  _onChange = () => {
    this.setState({
      schedule: ScheduleStore.getScheduleState()
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      ScheduleActions.getSchedule({ month: this.state.schedule.month, year: this.state.schedule.year });
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, this.loadingTime);
    });

    ScheduleStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ScheduleStore.removeChangeListener(this._onChange);
  }

  scheduleInfoWrapperWidth = () => {
    if (this.state.sidebarActive) {
      return 'schedule-info-wrapper-sidebar';
    }

    return 'schedule-info-wrapper-no-sidebar';
  }

  openSidebar = () => {
    this.setState({ sidebarActive: true });
  }

  closeSidebar = () => {
    this.setState({ sidebarActive: false });
  }

  handleMoveOneMonth = (direction) => {
    this.setState({ isLoading: true }, () => {
      let month;
      let monthIndex = ScheduleStore.monthNames.indexOf(this.state.schedule.month);
      if (direction === 'forward') month = ScheduleStore.monthNames[this.modulo((monthIndex + 1), 12)];
      if (direction === 'backward') month = ScheduleStore.monthNames[this.modulo((monthIndex - 1), 12)];
      let year = this.state.schedule.year;
      if (monthIndex === 11) year += 1;
      if (monthIndex === 0) year -= 1;
      ScheduleActions.getSchedule({ month: month, year: year });

      setTimeout(() => {
        this.setState({ isLoading: false });
      }, this.loadingTime);
    });
  }

  modulo = (x, m) => {
    return (x % m + m) % m;
  }

  render() {
    const ScheduleWithLoader = withLoader(Schedule);
    return (
      <div className="schedule-view">
        <Background />
        <div className={ `schedule-info-wrapper ${this.scheduleInfoWrapperWidth()}` }>
          <h1 className="schedule-title">Schedule</h1>
          <ScheduleNavbar
            month={ this.state.schedule.month }
            year={ this.state.schedule.year }
            handleMoveOneMonth={ this.handleMoveOneMonth }
          />
          <div className='schedule-info-header'>
            <div className='day-column'>
              <p>Monday</p>
            </div>
            <div className='day-column'>
              <p>Tuesday</p>
            </div>
            <div className='day-column'>
              <p>Wednesday</p>
            </div>
            <div className='day-column'>
              <p>Thursday</p>
            </div>
            <div className='day-column'>
              <p>Friday</p>
            </div>
            <div className='day-column'>
              <p>Saturday</p>
            </div>
            <div className='day-column'>
              <p>Sunday</p>
            </div>
          </div>

          <div className="schedule-info-body">
            <ScheduleWithLoader
              isLoading={ this.state.isLoading }
              schedule={ this.state.schedule.schedule }
              openSidebar={ this.openSidebar }
            />
          </div>
        </div>

        <ScheduleSidebar visible={ this.state.sidebarActive } closeSidebar={ this.closeSidebar } />
      </div>
    );
  }
}

ScheduleView.propTypes = propTypes;
export default ScheduleView;