import React from 'react';

class FlashMessage extends React.Component {
  _onClick() {
    this.props.closeFlashMessage();
  }

  renderFlashMessage() {
    if (!this.props.close) {
      setTimeout(() => this.props.closeFlashMessage(), this.props.timeout);

      return (
        <div className={`alert alert-${this.props.type}`}>
          <p></p>
          { this.renderErrorMessage() }
          <span className="close" onClick={ () => this._onClick() }><strong>X</strong></span>
        </div>
      );
    }
    return null;
  }

  renderErrorMessage() {
    return (
      <ul>
        { this.props.message.map(err => <li>{ err.field }: { err.message }</li>) }
      </ul>
    );
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