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
          <TextField label='Title' name='title' inline={ true }/>
        </Form>
      </div>
    );
  }
}

CreateEventForm.propTypes = propTypes;
export default CreateEventForm;