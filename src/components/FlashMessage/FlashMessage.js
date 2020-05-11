import React from 'react';
import Actions from '../../actions/FlashMessageActions/FlashMessageActions';
import Store from '../../stores/FlashMessageStore/FlashMessageStore';

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
          { this.renderErrorMessage() }
          <span data-test='close-flash-message' className="close" onClick={ () => this.handleCloseMessageClick() }><strong>X</strong></span>
        </div>
      );
    }
    return null;
  }

  renderErrorMessage() {
    if (Object.keys(this.state.message[0]).includes('field')) {
      return (
        <ul>
          { this.state.message.map((err, i) => <li key={i}>{ err.field }: { err.message }</li>) }
        </ul>
      );
    }

    return <li>Error: { this.state.message }</li>
  }

  render() {
    return(
      <div className='flash-message'>
        { this.renderFlashMessage() }
      </div>
    );
  }
}

export default FlashMessage;