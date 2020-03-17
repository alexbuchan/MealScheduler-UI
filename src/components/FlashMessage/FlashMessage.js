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
    const messageArr = this.props.message.split(' ');
    const [first, email, ...rest] = messageArr
    return <p>{ first } <strong>{ email }</strong> { rest.join(' ') }</p>;
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