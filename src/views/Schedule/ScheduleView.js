import React from 'react';
import ScheduleActions from '../../actions/schedule/ScheduleActions';
import ScheduleStore from '../../stores/ScheduleStore/ScheduleStore';
import Contacts from '../../components/Contacts/Contacts';
import Background from '../../components/Background/Background';
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
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    ScheduleStore.removeChangeListener(this._onChange);
  }

  render() {
    // const ContactsWithLoader = withLoader(Contacts);
    return (
      <div className="schedule-view">
        <Background />
        <h1 className="schedule-title">Schedule</h1>
        <div className="schedule-info-wrapper">
        </div>
      </div>
    );
  }
}

export default ScheduleView;