import React from 'react';
import Step from './Step/Step';

const StepsContainer = ({ steps, stepImages }) => {
  if (steps) {
    return steps.map((step, index) => {
      return (
        <Step key={ index } step={ step } stepImages={ '' }/>
      );
    });
  }
  
  return null;
}
 
export default StepsContainer;