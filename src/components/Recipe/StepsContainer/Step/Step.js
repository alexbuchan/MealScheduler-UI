import React from 'react';

const Step = ({ step }) => {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className='recipe-view-step-wrapper'>
      <label className='recipe-view-step-label'>{ capitalize(step[0]) }:</label>
      <p className='recipe-view-step-content'>{ step[1] }</p>
    </div>
  );
}
 
export default Step;