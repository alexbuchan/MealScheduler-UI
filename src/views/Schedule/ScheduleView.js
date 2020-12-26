import React from 'react';
import PropTypes from 'prop-types';

import Background from '../../components/Background/Background';
import ScheduleActions from '../../actions/schedule/ScheduleActions';
import ScheduleStore from '../../stores/ScheduleStore/ScheduleStore';
import Schedule from '../../components/Schedule/Schedule';
import ScheduleSidebar from '../../components/ScheduleSidebar/ScheduleSidebar';
import ScheduleNavbar from '../../components/ScheduleNavbar/ScheduleNavbar';
import ScheduleHeader from '../../components/ScheduleHeader/ScheduleHeader';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm'
import Modal from '../../components/Modal/Modal';
import withLoader from '../../HOC/Loader/Loader';
import { modulo } from '../../lib/Helpers/helpers';

const propTypes = {};

class ScheduleView extends React.Component {
  constructor() {
    super();

    this.loadingTime = 500;
    this.state = {
      isLoading: false,
      schedule: ScheduleStore.getScheduleState(),
      sidebarActive: false,
      day: {},
      openModal: false
    }
  }

  _onChange = () => {
    this.setState({
      schedule: ScheduleStore.getScheduleState()
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      ScheduleActions
        .getSchedule({ month: this.state.schedule.month, year: this.state.schedule.year })
        .then(() => {
          this.setState({ isLoading: false });
        });
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

  openSidebar = (day) => {
    this.setState({ sidebarActive: true, day });
  }

  closeSidebar = () => {
    this.setState({ sidebarActive: false });
  }

  handleMoveOneMonth = (direction) => {
    this.setState({ isLoading: true }, () => {
      let month;
      let monthIndex = ScheduleStore.monthNames.indexOf(this.state.schedule.month);
      let year = this.state.schedule.year;
      if (direction === 'forward') {
        month = ScheduleStore.monthNames[modulo((monthIndex + 1), 12)];
        if (monthIndex === 11) year += 1;
      }

      if (direction === 'backward') {
        month = ScheduleStore.monthNames[modulo((monthIndex - 1), 12)];
        if (monthIndex === 0) year -= 1;
      }

      ScheduleActions.getSchedule({ month: month, year: year });

      setTimeout(() => {
        this.setState({ isLoading: false });
      }, this.loadingTime);
    });
  }

  handleOpenModal = (ev) => {
    this.setState({ openModal: true });
  }

  handleCloseModal = (ev) => {
    this.setState({ openModal: false });
  }

  renderModal = () => {
    if (this.state.openModal) {
      return (
        <Modal closeModal={ this.handleCloseModal }>
          <CreateEventForm closeModal={ this.handleCloseModal }/>
        </Modal>
      );
    }

    return null;
  }

  LoaderScreen = ({ children }) => {
    return (
      <div className='schedule-view-loader-screen'>
        { children }
      </div>
    );
  }

  render() {
    const ScheduleWithLoader = withLoader(Schedule, this.LoaderScreen);
    return (
      <div className="schedule-view">
        <Background />
        <div className={ `schedule-info-wrapper ${this.scheduleInfoWrapperWidth()}` }>
          <ScheduleNavbar
            month={ this.state.schedule.month }
            year={ this.state.schedule.year }
            handleMoveOneMonth={ this.handleMoveOneMonth }
            handleOpenModal={ this.handleOpenModal }
          />
          <ScheduleHeader />

          <ScheduleWithLoader
            isLoading={ this.state.isLoading }
            schedule={ this.state.schedule.schedule }
            openSidebar={ this.openSidebar }
          />

          { this.renderModal() }
        </div>

        <ScheduleSidebar visible={ this.state.sidebarActive } closeSidebar={ this.closeSidebar } day={ this.state.day } />
      </div>
    );
  }
}

ScheduleView.propTypes = propTypes;
export default ScheduleView;