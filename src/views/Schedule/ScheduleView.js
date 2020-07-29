import React from 'react';
import Background from '../../components/Background/Background';
import ScheduleActions from '../../actions/schedule/ScheduleActions';
import ScheduleStore from '../../stores/ScheduleStore/ScheduleStore';
import Schedule from '../../components/Schedule/Schedule';
import ScheduleSidebar from '../../components/ScheduleSidebar/ScheduleSidebar';
import withLoader from '../../HOC/Loader/Loader';

class ScheduleView extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
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
    ScheduleActions.getSchedule({ month: 'July', year: 2020 });
    ScheduleStore.addChangeListener(this._onChange);
  }

  componentDidUpdate() {
    // this.wait(300) // REMOVE THIS LINE AFTER TESTING THE SPINNER FOR THE LOADING HOC
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    ScheduleStore.removeChangeListener(this._onChange);
  }

  // REMOVE THIS FUNCTION AFTER TESTING THE SPINNER FOR THE LOADING HOC
  wait = (ms) => {
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
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

  render() {
    const ScheduleWithLoader = withLoader(Schedule);
    return (
      <div className="schedule-view">
        <Background />
        <div className={ `schedule-info-wrapper ${this.scheduleInfoWrapperWidth()}` }>
          <h1 className="schedule-title">Schedule</h1>
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
              loaderClassName='schedule-loader'
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

export default ScheduleView;