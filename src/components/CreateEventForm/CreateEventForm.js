import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';
import TextField from '../formComponents/TextField/TextField';

const propTypes = {};

class CreateEventForm extends React.Component {
  render() {
    return (
      <div className='create-event-body'>
        <h3>Create Event</h3>
        <Form>
          <div className='create-event-form'>
            <div className='create-event-form-column'>
              <TextField
                label='Title'
                name='title'
                value=''
                inline={ true }
              />
              <TextField
                label='Date'
                name='date'
                value=''
                inline={ true }
              />
            </div>

            <div className='create-event-form-column'>
              <TextField
                label='Starts at'
                name='startsAt'
                value=''
                inline={ true }
              />
              <TextField
                label='Ends at'
                name='endsAt'
                value=''
                inline={ true }
              />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

CreateEventForm.propTypes = propTypes;
export default CreateEventForm;