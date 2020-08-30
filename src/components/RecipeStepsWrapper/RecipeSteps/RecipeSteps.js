import React from 'react';

const RecipeSteps = ({ steps }) => {
  return (
    <>
      { steps.map(child => child) }
    </>
  );
}
 
export default RecipeSteps;