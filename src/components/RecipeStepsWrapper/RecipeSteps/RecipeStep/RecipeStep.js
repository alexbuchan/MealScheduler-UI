import React from 'react';
import CloseIcon from '../../../../assets/images/svg/close.svg';


const RecipeStep = ({ index, label, name, handleOnChange, handleDeleteStep }) => {
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

      <div className='delete-step-text-input-wrapper'>
        <button className='delete-step-text-input-button' onClick={ () => handleDeleteStep(index) }>
          <CloseIcon className='delete-step-text-input-icon'/>
        </button>
      </div>
    </div>
  );
}
 
export default RecipeStep;