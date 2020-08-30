import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeSteps from './RecipeSteps/RecipeSteps';
import RecipeStep from './RecipeSteps/RecipeStep/RecipeStep';
import AddIcon from '../../assets/images/svg/plus.svg';

class RecipeStepsWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      childrenArray: [],
      numChildren: 0,
      stepValues: []
    };
  }

  componentDidUpdate(_, prevState) {
    if (prevState !== this.state) this.props.updateStepValues(this.state.stepValues);
  }

  handleRecipeStepChange = (ev, index) => {
    const stepValues = [...this.state.stepValues];
    stepValues[index].value = ev.target.value;

    this.setState({ stepValues });
  }

  handleAddStep = () => {
    const childrenArray = [...this.state.childrenArray];
    const stepValues = [...this.state.stepValues];
    stepValues.push({ step: childrenArray.length + 1, value: '' });

    childrenArray.push(
      <RecipeStep 
        key={ uuidv4() } 
        index={ childrenArray.length }
        handleOnChange={ this.handleRecipeStepChange }
        handleDeleteStep={ this.handleDeleteStep } 
        label={ `Step ${ childrenArray.length + 1 }` }
        name={ `step${ childrenArray.length + 1 }` }
        value=''
      />
    );

    this.setState({
      numChildren: this.state.numChildren + 1,
      childrenArray: childrenArray,
      stepValues: stepValues
    });
  }

  handleDeleteStep = (index) => {
    const childrenArray = [...this.state.childrenArray];
    const stepValues = [...this.state.stepValues];
    stepValues.splice(index, 1);
    childrenArray.splice(index, 1);

    const updatedChildrenArray = childrenArray.map((child, index) => {
      return React.cloneElement(
        child, 
        { index, label: `Step ${ index + 1 }`, name: `step${ index + 1 }` }
      );
    });

    const updateStepValues = stepValues.map((step, index) => { return { step: index + 1, value: step.value } });

    this.setState({
      numChildren: this.state.numChildren - 1,
      childrenArray: updatedChildrenArray,
      stepValues: updateStepValues
    });
  }

  render() {
    return (
      <div className='recipe-steps'>
        <div className='recipe-steps-header'>
          <p className='invisible-wrapper'></p>

          <h4 className='recipe-steps-title'>Steps</h4>

          <div className='recipe-steps-add-step-wrapper'>
            <label className='recipe-steps-add-step-label'>Add Step</label>

            <button className='recipe-steps-add-step-button' onClick={ this.handleAddStep }>
              <AddIcon className='recipe-steps-add-step-icon'/>
            </button>
          </div>
        </div>

        <div className='recipe-steps-body'>
          <RecipeSteps steps={ this.state.childrenArray } />
        </div>
      </div>
    );
  }
}
 
export default RecipeStepsWrapper;