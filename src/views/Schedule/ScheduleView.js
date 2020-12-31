import React from 'react';
import PropTypes from 'prop-types';

import Background from '../../components/Background/Background';
import ScheduleActions from '../../actions/schedule/ScheduleActions';
import ScheduleStore from '../../stores/ScheduleStore/ScheduleStore';
import Schedule from '../../components/Schedule/Schedule';
import ScheduleSidebar from '../../components/ScheduleSidebar/ScheduleSidebar';
import ScheduleNavbar from '../../components/ScheduleNavbar/ScheduleNavbar';
import ScheduleHeader from '../../components/ScheduleHeader/ScheduleHeader';
import EventForm from '../../components/EventForm/EventForm'
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
      dayId: 1,
      openCreateEventModal: false,
      openEditEventModal: false,
      openDeleteEventModal: false,
      eventId: 0
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

  openSidebar = (dayId) => {
    this.setState({ sidebarActive: true, dayId });
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

  handleOpenCreateEventModal = (_) => this.setState({ openCreateEventModal: true });
  handleCloseCreateEventModal = (_) => this.setState({ openCreateEventModal: false });
  handleOpenEditEventModal = (_, eventId) => this.setState({ openEditEventModal: true, eventId: eventId });
  handleCloseEditEventModal = (_) => this.setState({ openEditEventModal: false });
  handleOpenDeleteEventModal = (_, eventId) => this.setState({ openDeleteEventModal: true, eventId: eventId });
  handleCloseDeleteEventModal = (_, eventId) => this.setState({ openDeleteEventModal: false, eventId: eventId });

  createEventModal = () => {
    if (this.state.openCreateEventModal) {
      return (
        <Modal closeModal={ this.handleCloseCreateEventModal }>
          <EventForm closeModal={ this.handleCloseCreateEventModal } type='create'/>
        </Modal>
      );
    }

    return null;
  }

  editEventModal = () => {
    if (this.state.openEditEventModal) {
      const currentDay = this.state.schedule.schedule[this.state.dayId];
      const currentEvent = currentDay.events.filter(event => event.id === this.state.eventId)[0];
      return (
        <Modal closeModal={ this.handleCloseEditEventModal }>
          <EventForm closeModal={ this.handleCloseEditEventModal } form={ currentEvent } type='edit' eventId={this.state.eventId} />
        </Modal>
      );
    }

    return null;
  }

  handleDeleteEvent = (eventId) => {
    ScheduleActions.deleteEvent(eventId);
    this.handleCloseDeleteEventModal();
  }

  deleteEventModal = () => {
    if (this.state.openDeleteEventModal) {
      const currentDay = this.state.schedule.schedule[this.state.dayId];
      const currentEvent = currentDay.events.filter(event => event.id === this.state.eventId)[0];
      return (
        <Modal closeModal={ this.handleCloseDeleteEventModal } size='small'>
          <>
            <h3>Are sure you want to delete this event?</h3>
            <button onClick={ () => this.handleDeleteEvent(currentEvent.id) }>Delete</button>
            <button onClick={ this.handleCloseDeleteEventModal }>Cancel</button>
          </>
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

  renderScheduleSidebar = () => {
    if (this.state.schedule.schedule.length > 0) {
      return (
        <ScheduleSidebar
          visible={ this.state.sidebarActive }
          closeSidebar={ this.closeSidebar }
          day={ this.state.schedule.schedule[this.state.dayId] }
          handleOpenEditEventModal={ this.handleOpenEditEventModal }
          handleDeleteEvent={ this.handleOpenDeleteEventModal }
        />
      );
    }

    return null;
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
            handleOpenCreateEventModal={ this.handleOpenCreateEventModal }
          />
          <ScheduleHeader />

          <ScheduleWithLoader
            isLoading={ this.state.isLoading }
            schedule={ this.state.schedule.schedule }
            openSidebar={ this.openSidebar }
          />

          { this.createEventModal() }
          { this.editEventModal() }
          { this.deleteEventModal() }
        </div>

        { this.renderScheduleSidebar() }
      </div>
    );
  }
}

ScheduleView.propTypes = propTypes;
export default ScheduleView;