import React from 'react';
import PropTypes from 'prop-types';
import Actions from '../../actions/FlashMessageActions/FlashMessageActions';
import Store from '../../stores/FlashMessageStore/FlashMessageStore';

const propTypes = {
  duration: PropTypes.number // Amount of time component is displayed before "disappearing".
};

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: Store.getMessage(),
      open: Store.getOpen(),
      type: Store.getType(),
      duration: this.props.duration || Store.getDuration()
    }
  }

  _onChange = () => {
    this.setState({
      message: Store.getMessage(),
      open: Store.getOpen(),
      type: Store.getType(),
      duration: this.props.duration || Store.getDuration()
    });
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  handleCloseMessageClick() {
    Actions.closeFlashMessage();
  }

  renderFlashMessage() {
    if (this.state.open) {
      setTimeout(() => Actions.closeFlashMessage(), this.state.duration);

      return (
        <div className={`alert alert-${this.state.type}`}>
          <p></p>
          { this.renderMessage() }
          <span data-test='close-flash-message' className="close" onClick={ () => this.handleCloseMessageClick() }><strong>X</strong></span>
        </div>
      );
    }
    return null;
  }

  renderMessage() {
      if (this.state.message.length > 1) {
      return (
        <ul>
          { this.state.message.map((message, i) => <li key={i}>{ message }</li>) }
        </ul>
      );
    }

    return <li>{ this.state.message[0] }</li>
  }

  render() {
    return(
      <div className='flash-message'>
        { this.renderFlashMessage() }
      </div>
    );
  }
}

FlashMessage.propTypes = propTypes;
export default FlashMessage;