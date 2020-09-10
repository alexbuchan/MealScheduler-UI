import React from 'react';
import Step from './Step/Step';

const StepsContainer = ({ steps }) => {
  if (steps) {
    return Object.entries(steps).map((step, index) => {
      return (
        <Step key={ index } step={ step }/>
      );
    });
  }
  
  return null;
}
 
export default StepsContainer;