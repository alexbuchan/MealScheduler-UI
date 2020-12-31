import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from '../../assets/images/svg/close.svg';

const propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.string
};

const Modal = ({ closeModal, children, size }) => {
  const handleCloseModal = (ev) => {
    closeModal(ev);
  }

  const modalSize = () => {
    switch(size) {
      case 'small':
        return { width: 400 };
      case 'medium':
        return { width: 766 };
      case 'large':
        return { width: 900 };
      default:
        return { width: 766 };
    }
  }

  return (
    <div className='custom-modal'>
      <div className='custom-modal-main' style={ { ...modalSize() } }>
        <div className='custom-modal-close-button-wrapper'>
          <button className='custom-modal-close-button' onClick={ handleCloseModal }>
            <CloseButton className='custom-modal-close-icon' />
          </button>
        </div>
        { children }
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;
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