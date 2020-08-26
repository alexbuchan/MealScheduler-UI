import React from 'react';
import Actions from '../../actions/schedule/ScheduleActions';

import Form from '../Form/Form';
import { Dropdown } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react'
import TextField from '../formComponents/TextField/TextField';

const propTypes = {};

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
  }
  state = {
    form: {
      title: '',
      eventType: '',
      recipes: [],
      date: '',
      dateFrequency: {},
      beginAt: '',
      endAt: '',
      comments: ''
    },
    eventTypes: [],
    recipes: [],
    dateFrequencies: []
  }

  componentDidMount() {
    // const recipes = RecipeActions.getRecipes();
    // const eventTypes = Actions.getEventTypes();
    const recipes = [
      { id: 1, name: 'ham sandwich' },
      { id: 2, name: 'cheese sandwich' },
      { id: 3, name: 'fajitas' }
    ];

    const eventTypes = [
      { id: 1, name: 'FOOD' },
      { id: 2, name: 'COOKING' },
      { id: 3, name: 'SHOPPING' }
    ];

    const dateFrequencies = [
      { id: 1, name: 'DAILY' },
      { id: 2, name: 'WEEKLY' },
      { id: 3, name: 'BIWEEKLY' },
      { id: 4, name: 'MONTHLY' }
    ];

    this.setState({ recipes, eventTypes, dateFrequencies });
  }

  handleOnSubmit = () => {
    Actions.createEvent(this.state.form, this.state.form.eventType.name);
    this.props.closeModal();
  }

  handleTextFieldChange = (ev) => {
    ev.preventDefault();

    const form = { ...this.state.form };
    form[ev.target.name] = ev.target.value;
    this.setState({ form });
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  eventTypes = () => {
    return this.state.eventTypes.map((event, index) => { return { value: index, text: this.capitalize(event.name) } });
  }

  recipes = () => {
    return this.state.recipes.map((recipe, index) => { return { value: index, text: recipe.name } });
  }

  dateFrequencies = () => {
    return this.state.dateFrequencies.map((frequency, index) => { return { value: index, text: frequency.name } });
  }

  renderDateFrequency = () => {
    switch (this.state.form.eventType.name) {
      case 'FOOD':
        return this.renderInvisibleColumn();
      case 'COOKING':
        return this.renderInvisibleColumn();
      case 'SHOPPING':
        return (
          <div className='create-event-form-column create-event-form-date-frequency-wrapper'>
            <div className='create-event-form-date-frequency'>
              <div className='label-wrapper'>
                <label className='label'>Date Frequency</label>
              </div>

              <Dropdown
                placeholder='Date Frequency'
                fluid
                search
                selection
                options={ this.dateFrequencies() }
                onChange={ this.handleDateFrequencyChange }
              />
            </div>
          </div>
        );
      default:
        return this.renderInvisibleColumn();
    }
  }

  renderInvisibleColumn = () => {
    return (
      <div className='create-event-form-invisible-wrapper'></div>
    );
  }

  handleEventTypeChange = (_, { value }) => {
    const form = { ...this.state.form };
    const eventType = this.state.eventTypes[value];
    form.eventType = eventType;

    this.setState({ form });
  }

  handleRecipesChange = (_, { value }) => {
    const form = { ...this.state.form };
    const recipes = this.state.recipes.filter((_, index) => value.includes(index));
    form.recipes = recipes;

    this.setState({ form });
  }

  handleDateFrequencyChange = (_, { value }) => {
    const form = { ...this.state.form };
    const dateFrequency = this.state.dateFrequencies[value];
    form.dateFrequency = dateFrequency;

    this.setState({ form });
  }

  render() {
    return (
      <div className='create-event-body'>
        <h3>Create Event</h3>
        <Form
          submitButtonLabel='Create Event'
          onSubmit={ this.handleOnSubmit }
        >
          <div className='create-event-form'>
            <div className='create-event-form-row create-event-form-row-1'>
              <div className='create-event-form-row-title-wrapper create-event-form-column'>
                <div className='create-event-form-row-title'>
                  <div className='label-wrapper'>
                    <label className='label'>Title</label>
                  </div>
                  <Input
                    className='title-text-input'
                    placeholder='Title'
                    name='title'
                    onChange={ this.handleTextFieldChange }
                  />
                </div>
              </div>

              <div className='create-event-form-row-event-type-wrapper create-event-form-column'>
                <div className='create-event-form-row-event-type'>
                  <div className='label-wrapper'>
                    <label className='label'>Event Type</label>
                  </div>
                  <Dropdown
                    placeholder='Event Type'
                    fluid
                    search
                    selection
                    options={ this.eventTypes() }
                    onChange={ this.handleEventTypeChange }
                  />
                </div>
              </div>
            </div>

            <div className='create-event-form-row create-event-form-row-2'>
              <div className='create-event-form-row-2-date create-event-form-column'>
                <TextField
                  label='Date'
                  name='date'
                  type='date'
                  value={ this.state.form.date }
                  width={ 300 }
                  onChange={ this.handleTextFieldChange }
                />
              </div>

              <div className='create-event-form-row-times-wrapper'>
                <div className='create-event-form-row-times'>
                  <div className='create-event-form-column create-event-form-row-2-begin-at'>
                    <TextField
                      label='Begin at'
                      name='beginAt' type='time'
                      value={ this.state.form.beginAt }
                      width={ 149 }
                      onChange={ this.handleTextFieldChange }
                    />
                  </div>

                  <div className='create-event-form-column create-event-form-row-2-end-at'>
                    <TextField
                      label='End at'
                      name='endAt'
                      type='time'
                      value={ this.state.form.endAt }
                      width={ 149 }
                      onChange={ this.handleTextFieldChange }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='create-event-form-row create-event-form-row-3'>
              <div className='create-event-form-column create-event-form-row-recipes-wrapper'>
                <div className='create-event-form-row-recipes'>
                  <div className='label-wrapper'>
                    <label className='label'>Recipes</label>
                  </div>
                  <Dropdown
                    placeholder='Search Recipes'
                    fluid
                    multiple
                    search
                    selection
                    options={ this.recipes() }
                    onChange={ this.handleRecipesChange }
                  />
                </div>
              </div>

              { this.renderDateFrequency() }
            </div>

            <div className='create-event-form-row create-event-form-row-4'>
              <div className='create-event-form-row-comments'>
                <label className='create-event-form-row-comments-label'>Comments</label>
                <textarea
                  className='create-event-form-row-comments-textarea'
                  name='comments'
                  onChange={ this.handleTextFieldChange }
                  value={ this.state.form.comments }
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