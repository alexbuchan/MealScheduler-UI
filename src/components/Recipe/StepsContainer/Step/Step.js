import React from 'react';
import Carousel from '../../../Carousel/Carousel';

const Step = ({ step }) => {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const displayStepImages = () => {
    const settings = {
      visibleSlides: 1,
      totalSlides: step.images.length,
      step: 1,
      dragStep: 1,
      naturalSlideWidth: 400,
      naturalSlideHeight: 500
    };

    if (step.images.length > 0) {
      return (
        <Carousel settings={ settings } >
          { step.images.map((image, index) => {
              return (
                <div key={ index } className='upload-recipe-images-preview-div'>
                  <img className='upload-recipe-images-preview' src={ image.file_name }></img>
                </div>
              )
          }) }
        </Carousel>
      );
    }

    return (
      <div className='label-wrapper-upload-image'>
        <label className='label-upload-image'>Add more photos to your recipe's image gallery</label>
      </div>
    );
  }

  return (
    <div className='recipe-view-step-wrapper'>
      <label className='recipe-view-step-label'>{ capitalize(step.name) }</label>
      <p className='recipe-view-step-content'>{ step.description }</p>
      <div className='recipe-view-step-images-carousel-wrapper'>
        { displayStepImages() }
      </div>
    </div>
  );
}
 
export default Step;