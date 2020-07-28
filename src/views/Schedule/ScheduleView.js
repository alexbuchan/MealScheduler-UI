import React from 'react';
import Background from '../../components/Background/Background';
import ScheduleActions from '../../actions/schedule/ScheduleActions';
import ScheduleStore from '../../stores/ScheduleStore/ScheduleStore';
import Schedule from '../../components/Schedule/Schedule';
import withLoader from '../../HOC/Loader/Loader';

class ScheduleView extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      schedule: ScheduleStore.getScheduleState()
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
    // this.wait(750) // REMOVE THIS LINE AFTER TESTING THE SPINNER FOR THE LOADING HOC
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

  render() {
    const ScheduleWithLoader = withLoader(Schedule);
    return (
      <div className="schedule-view">
        <Background />
        <h1 className="schedule-title">Schedule</h1>
        <div className="schedule-info-wrapper">
          <ScheduleWithLoader
            isLoading={ this.state.isLoading }
            loaderClassName='schedule'
            schedule={ this.state.schedule.schedule }
          />
        </div>
      </div>
    );
  }
}

export default ScheduleView;