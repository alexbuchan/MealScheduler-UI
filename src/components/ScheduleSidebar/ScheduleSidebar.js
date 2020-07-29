import React from 'react';

class ScheduleSidebar extends React.Component {
  sidebarVisibility = () => {
    if (this.props.visible) {
      return 'schedule-sidebar-visible';
    }

    return 'schedule-sidebar-hidden';
  }

  closeButtonVisibility = () => {
    if (this.props.visible) {
      return 'schedule-sidebar-close-button-visible';
    }

    return 'schedule-sidebar-close-button-hidden';
  }

  handleCloseSidebar = (ev) => {
    ev.preventDefault();
    this.props.closeSidebar();
  }

  render() {
    return (
      <div className={ this.sidebarVisibility() }>
        <div className='schedule-sidebar-close-button-wrapper'>
          <button onClick={ this.handleCloseSidebar } className={ this.closeButtonVisibility() }>X</button>
        </div>
      </div>
    );
  }
}

export default ScheduleSidebar;