import React from 'react';
import Form from '../Form/Form';
import TextField from '../formComponents/TextField/TextField';
import SearchableDropdown from '../formComponents/SearchableDropdown/SearchableDropdown';

const propTypes = {};

class CreateEventForm extends React.Component {
  state = {
    title: '',
    date: '',
    beginAt: '',
    endAt: '',
    comments: ''
  }

  handleOnSubmit = () => {
    console.log('Submitted!');
  }

  handleTextFieldChange = (ev) => {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  render() {
    return (
      <div className='create-event-body'>
        <h3>Create Event</h3>
        <Form
          onSubmit={ this.handleOnSubmit }
        >
          <div className='create-event-form'>
            <div className='create-event-form-row create-event-form-row-1'>
              <div className='create-event-form-row-title create-event-form-column'>
                <TextField
                  label='Title'
                  name='title'
                  type='text'
                  value={ this.state.title }
                  width={ 300 }
                  onChange={ this.handleTextFieldChange }
                />
              </div>

              <div className='create-event-form-row-2-date create-event-form-column'>
                <TextField
                  label='Date'
                  name='date'
                  type='date'
                  value={ this.state.date }
                  width={ 300 }
                  onChange={ this.handleTextFieldChange }
                />
              </div>
            </div>

            <div className='create-event-form-row create-event-form-row-2'>
              <div className='create-event-form-row-event-type create-event-form-column'>
                <SearchableDropdown
                  label='Event Type'
                  placeholder='Type'
                  width={ 300 }
                  dropdownItems={ ['Food', 'Cooking', 'Shopping'] }
                />
              </div>

              <div className='create-event-form-column create-event-form-row-2-begin-at'>
                <TextField
                  label='Begin at'
                  name='beginAt' type='time'
                  value={ this.state.beginAt }
                  width={ 300 }
                  onChange={ this.handleTextFieldChange }
                />
              </div>
            </div>

            <div className='create-event-form-row create-event-form-row-3'>
              <div className='create-event-form-column create-event-form-row-recipes'>
                <SearchableDropdown
                  label='Recipes'
                  placeholder='Search Recipes...'
                  width={ 300 }
                  dropdownItems={ ['ham sandwich', 'cheese sandwich', 'fajitas', 'Incredibly long recipe name for a recipe'] }
                />
              </div>

              <div className='create-event-form-column create-event-form-row-2-end-at'>
                <TextField
                  label='End at'
                  name='endAt'
                  type='time'
                  value={ this.state.endAt }
                  width={ 300 }
                  onChange={ this.handleTextFieldChange }
                />
              </div>
            </div>

            <div className='create-event-form-row create-event-form-row-4'>
              <div className='create-event-form-row-comments'>
                <label className='create-event-form-row-comments-label'>Comments</label>
                <textarea
                  className='create-event-form-row-comments-textarea'
                  name='comments'
                  onChange={ this.handleTextFieldChange }
                  value={ this.state.comments }
                >
                </textarea>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

CreateEventForm.propTypes = propTypes;
export default CreateEventForm;

// Datepicker (date)
// Timepicker (being_at, end_at)
// Searchable Dropdown (event_type, recipe)
// Textfield (title, comments)