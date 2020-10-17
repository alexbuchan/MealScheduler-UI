import React from 'react';

const Button = ({ label, size, type }) => {
  const buttonTypeClass = () => {
    switch(type) {
      case 'normal':
        return 'type-normal-button';
      case 'warning':
        return 'type-warning-button';
      case 'urgent':
        return 'type-urgent-button';
      default:
        return 'type-normal-button';
    }
  }

  const buttonSizeClass = () => {
    switch(size) {
      case 'small':
        return 'size-small-button';
      case 'medium':
        return 'size-medium-button';
      case 'large':
        return 'size-large-button';
      default:
        return 'size-normal-button';
    }
  }

  return (
    <button className={ `custom-button ${buttonTypeClass()} ${buttonSizeClass()}` }>
      <p className={ `custom-button-label ${buttonTypeClass()}-label ${buttonSizeClass()}-label` }>{ label }</p>
    </button>
  );
}
 
export default Button;