import React from 'react';
import PropTypes from 'prop-types';

// IMPORT ACTIONS
import Actions from '../../actions/schedule/ScheduleActions';
import RecipeActions from '../../actions/recipe/RecipeActions';
import EventTypeActions from '../../actions/EventTypeActions/EventTypeActions';
import DateFrequencyActions from '../../actions/DateFrequencyActions/DateFrequencyActions';

// IMPORT STORES
import RecipeStore from '../../stores/RecipeStore/RecipeStore';
import EventTypeStore from '../../stores/EventTypeStore/EventTypeStore';
import DateFrequencyStore from '../../stores/DateFrequencyStore/DateFrequencyStore';

// IMPORT COMPONENTS
import Form from '../Form/Form';
import { Dropdown } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react'
import TextField from '../formComponents/TextField/TextField';

const propTypes = {
  form: PropTypes.shape({
    title: PropTypes.string,
    eventType: PropTypes.string,
    recipes: PropTypes.array,
    date: PropTypes.string,
    dateFrequency: PropTypes.object,
    beginAt: PropTypes.string,
    endAt: PropTypes.string,
    comments: PropTypes.string
  }),
  type: PropTypes.string,
  eventId: PropTypes.number
};

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    if (props.form) {
      const { title, event_type, recipes, date, date_frequency, begin_at, end_at, comments } = props.form;
      this.state = {
        form: {
          title: title,
          eventType: event_type,
          recipes: recipes,
          date: date,
          dateFrequency: date_frequency,
          beginAt: begin_at,
          endAt: end_at,
          comments: comments
        },
        eventTypes: EventTypeStore.getEventTypesState().eventTypes,
        recipes: RecipeStore.getRecipesState().recipes,
        dateFrequencies: DateFrequencyStore.getDateFrequenciesState().dateFrequencies,
        eventId: props.eventId
      }
    } else {
      this.state = {
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
        eventTypes: EventTypeStore.getEventTypesState().eventTypes,
        recipes: RecipeStore.getRecipesState().recipes,
        dateFrequencies: DateFrequencyStore.getDateFrequenciesState().dateFrequencies
      }
    }
  }

  _onChange = () => {
    this.setState({
      recipes: RecipeStore.getRecipesState().recipes,
      eventTypes: EventTypeStore.getEventTypesState().eventTypes,
      dateFrequencies: DateFrequencyStore.getDateFrequenciesState().dateFrequencies
    });
  }

  componentDidMount() {
    RecipeActions.getRecipes();
    EventTypeActions.getEventTypes();
    DateFrequencyActions.getDateFrequencies();

    RecipeStore.addChangeListener(this._onChange);
    EventTypeStore.addChangeListener(this._onChange);
    DateFrequencyStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    RecipeStore.removeChangeListener(this._onChange);
    EventTypeStore.removeChangeListener(this._onChange);
    DateFrequencyStore.removeChangeListener(this._onChange);
  }

  handleOnSubmit = () => {
    if (this.props.type === 'create') {
      Actions.createEvent(this.state.form);
    } else {
      Actions.editEvent(this.state.form, this.props.eventId);
    }

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
    return this.state.eventTypes.map((event, index) => { return { value: index, text: event } });
  }

  recipes = () => {
    return this.state.recipes.map((recipe, index) => { return { value: index, text: recipe.name } });
  }

  dateFrequencies = () => {
    return this.state.dateFrequencies.map((frequency, index) => { return { value: index, text: frequency.name } });
  }

  renderDateFrequency = () => {
    switch (this.state.form.eventType) {
      case 'FoodEvent':
        return this.renderInvisibleColumn();
      case 'CookingEvent':
        return this.renderInvisibleColumn();
      case 'ShoppingEvent':
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

  findEventType = () => {
    if (this.eventTypes().length > 0 && this.state.form.eventType) {
      return this.eventTypes().filter(eventType => eventType.text === this.state.form.eventType)[0].value;
    }

    return '';
  }

  findDefaultRecipes = () => {
    const recipeIds = this.state.form.recipes.map(recipe => recipe.id)
    const eventRecipes = this.state.recipes.filter(recipe => recipeIds.find(id => recipe.id - 1 === id - 1))
    return eventRecipes.map(recipe => recipe.id - 1)
  }

  formStaticText = () => {
    if (this.props.type === 'create') {
      return {
        title: 'Create Event',
        submitButtonLabel: 'Create Event'
      };
    }

    return {
      title: 'Edit Event',
      submitButtonLabel: 'Edit Event'
    };
  }

  render() {
    const { title, submitButtonLabel } = this.formStaticText();

    return (
      <div className='create-event-body'>
        <h3>{ title }</h3>
        <Form
          submitButtonLabel={ submitButtonLabel }
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
                    value={ this.state.form.title }
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
                    value={ this.findEventType() }
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
                      name='beginAt'
                      type='time'
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
                    className='create-event-form-row-recipes-dropdown'
                    placeholder='Search Recipes'
                    fluid
                    multiple
                    search
                    selection
                    value={ this.findDefaultRecipes() }
                    options={ this.recipes() }
                    onChange={ this.handleRecipesChange }
                  />
                </div>
              </div>

              { this.renderDateFrequency() }
            </div>

            {/* <div className='create-event-form-row create-event-form-row-3'>
              <div className='create-event-form-column create-event-form-row-recipes-wrapper'>
                <div className='create-event-form-row-recipes'>
                  <div className='label-wrapper'>
                    <label className='label'>Recipes</label>
                  </div>
                  <Input
                    icon='tags'
                    iconPosition='left'
                    label={{ tag: true, content: 'Add Tag' }}
                    labelPosition='right'
                    placeholder='Enter tags'
                    // options={ this.recipes() }
                    // onChange={ this.handleRecipesChange }
                  />
                </div>
              </div>

              { this.renderDateFrequency() }
            </div> */}

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

EventForm.propTypes = propTypes;
export default EventForm;

// Datepicker (date)
// Timepicker (being_at, end_at)
// Searchable Dropdown (event_type, recipe)
// Textfield (title, comments)