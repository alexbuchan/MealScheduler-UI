import React from 'react';
import AddIcon from '../../../../assets/images/svg/plus.svg';
import CloseIcon from '../../../../assets/images/svg/close.svg';


const RecipeStep = ({ index, label, name, handleOnChange, handleDeleteStep, handleAddStep }) => {
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

      <div className='steps-buttons-wrapper'>
        <button className='add-step-button' onClick={ handleAddStep }>
          <AddIcon className='add-step-icon'/>
        </button>
        <button className='delete-step-button' onClick={ () => handleDeleteStep(index) }>
          <CloseIcon className='delete-step-icon'/>
        </button>
      </div>
    </div>
  );
}
 
export default RecipeStep;