import React from 'react';

const RecipeSteps = ({ steps, handleStepsImageUpload, previewUploadImages }) => {
  return (
    <>
      { steps.map(child => { return React.cloneElement(child, { handleStepsImageUpload, previewUploadImages }) }) }
    </>
  );
}
 
export default RecipeSteps;