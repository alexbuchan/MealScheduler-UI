import React from 'react';

const Modal = ({ closeModal }) => {

  handleCloseModal = (ev) => {
    closeModal(ev);
  }

  if (this.props.open) {
    return (
      <div className='custom-modal'>
        <div className='custom-modal-main'>
          <div className='custom-modal-close-button-wrapper'>
            <button className='custom-modal-close-button' onClick={ handleCloseModal }>X</button>
          </div>
          <div className='custom-modal-header'>
            <h1 className='custom-modal-title'>Hello Modal!</h1>
          </div>
          <div className='custom-modal-content'>
            <h5 className='custom-modal-subtitle'>Modal Content</h5>
            <p className='custom-modal-paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh ex, ultrices quis enim vitae, congue maximus libero. Praesent porttitor magna in euismod tempor. Fusce vel nunc massa. Nunc rhoncus ante vitae nulla iaculis, laoreet posuere nunc lacinia. Praesent quis mi leo. Quisque eget fringilla nisl. Duis consequat enim vitae ultricies auctor. Cras eget bibendum velit. Vivamus dignissim iaculis enim, eu fermentum diam pulvinar quis.</p>
          </div> 
          <div className='custom-modal-footer'>
            <p>Footer</p>
          </div>           
        </div>
      </div>
    );
  }
  
  return null;
}

export default Modal;

/* HOW TO CONNECT IN PARENT COMPONENT

Set a new attribute in parent state (e.g. openModal)
Add the renderModal method to the main render method of the parent component
Add these handler methods to parent component:

  handleOpenModal = (ev) => {
    this.setState({ openModal: true });
  }

  handleCloseModal = (ev) => {
    this.setState({ openModal: false });
  }

  renderModal = () => {
    if (this.state.openModal) {
      return <Modal open={ this.state.openModal } closeModal={ this.handleCloseModal }/>;
    }

    return <button onClick={ this.handleOpenModal }>Trigger Modal</button>;
  }
*/