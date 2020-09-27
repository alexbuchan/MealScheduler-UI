import React from 'react';
import AddIcon from '../../../../assets/images/svg/plus.svg';
import CloseIcon from '../../../../assets/images/svg/close.svg';
import { Icon } from 'semantic-ui-react';
import Carousel from '../../../Carousel/Carousel';


const RecipeStep = ({ index, label, name, handleOnChange, handleDeleteStep, handleAddStep, handleImageUpload, previewUploadImages }) => {
  const carouselSettings = {
    visibleSlides: 1,
    totalSlides: previewUploadImages.length,
    step: 1,
    dragStep: 1,
    naturalSlideWidth: 400,
    naturalSlideHeight: 500
  };

  const imageUpload = (ev) => {
    handleImageUpload(ev, name);
  }

  const displayPreviewUploadStepImages = () => {
    return previewUploadImages.filter(image => image.step === `step${index + 1}`).map((image, index) => {
      return (
        <div key={ index } className='upload-step-images-preview-div'>
          <img className='upload-step-images-preview' src={ URL.createObjectURL(image.file) }></img>
        </div>
      )
    });
  }

  return (
    <div className='recipe-steps-step-wrapper'>
      <div className='recipe-steps-step'>
        <div className='label-wrapper'>
          <label className='label'>{ label }</label>
        </div>
        <textarea
          className='step-text-input'
          placeholder='Describe this step for your recipe...'
          name={ name }
          onChange={ (ev) => handleOnChange(ev, index) }
        >
        </textarea>
      </div>

      <div className='right-section-wrapper'>
        <div className='steps-buttons-wrapper'>
          <button className='upload-step-image-button steps-buttons-icon'>
            <label htmlFor={ `upload-step-image-input-${index}` } className='upload-step-image-label'>
              <Icon name='upload' size='big' className='upload-step-image-icon'/>
            </label>
            <input type="file" multiple hidden onChange={ imageUpload } id={ `upload-step-image-input-${index}` }/>
          </button>
          <button className='add-step-button steps-buttons-icon' onClick={ handleAddStep }>
            <AddIcon className='add-step-icon'/>
          </button>
          <button className='delete-step-button steps-buttons-icon' onClick={ () => handleDeleteStep(index) }>
            <CloseIcon className='delete-step-icon'/>
          </button>
        </div>

        <div className='step-images-upload'>
          <Carousel settings={ carouselSettings }>
            { displayPreviewUploadStepImages() }
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default RecipeStep;