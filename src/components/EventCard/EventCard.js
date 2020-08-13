import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  event: PropTypes.object,
  accordionEffect: PropTypes.bool
};

class EventCard extends React.Component {
  state = {
    togglePanel: false
  }

  foodEventRecipe = () => {
    return (
      <div className='food-event-data'>
        <p className='recipe-label'>Recipe:</p>
        <a href='#' className='recipe-link'>{ this.props.event.recipe.name }</a>
      </div>
    );
  }

  shoppingEventRecipes = () => {
    return (
      <div className='shopping-event-data'>
        <p>Recipes:</p>
        <div className='shopping-event-recipes'>{ this.props.event.recipes.map((recipe, index) => <a key={ index } href='#' className='recipe-link'>{ recipe.name }</a>) }</div>
      </div>
    );
  }

  specificEventData = () => {
    switch(this.props.event.event_type) {
      case 'FOOD':
        return this.foodEventRecipe();
      case 'SHOPPING':
        return this.shoppingEventRecipes();
    }
  }

  eventCardColor = () => {
    switch(this.props.event.event_type) {
      case 'FOOD':
        return '#a7f9a7';
      case 'SHOPPING':
        return '#fdc88c';
      default:
        return 'gray';
    }
  }

  eventCardAccordionEffect = (type) => {
    if (this.props.accordionEffect) {
      if (type === 'tab') return 'accordion';
      if (type === 'body') {
        if (this.state.togglePanel === false) return 'panel';
        if (this.state.togglePanel === true) return 'panel-visible';
      }
    }

    return null;
  }

  togglePanel = () => {
    this.setState({
      togglePanel: !this.state.togglePanel
    });
  }

  render() {
    return (
      <div className='event-card' style={ { backgroundColor: this.eventCardColor() } }>
        <div onClick={ this.togglePanel } className={ `event-title-wrapper ${this.eventCardAccordionEffect('tab')}` }>
          <h5 className='event-title'>{ this.props.event.title }</h5>
        </div>

        <div className={ `event-card-body ${this.eventCardAccordionEffect('body')}` }>
          <p>Date: { this.props.event.date }</p>

          <div className='event-begin-end-wrapper'>
            <p>Starts at: { this.props.event.begin_at }</p>
            <p>Ends at: { this.props.event.end_at }</p>
          </div>

          { this.specificEventData() }
        </div>

      </div>
    );
  }
}

EventCard.defaultProps = {
  title: true,
  accordionEffect: false
}

EventCard.propTypes = propTypes;
export default EventCard;

// begin_at: "09:00"
// comments: "One hell of a breakfast"
// created_at: "2020-07-29T10:23:19.598Z"
// date: "2020-08-06"
// end_at: "09:30"
// event_type: "FOOD"
// event_type_id: 1
// id: 10
// recipe: {id: 1, name: "Ham Sandwich", steps: "step1-Grab 2 bits of bread-step2-Grab 2 slices of …of ham between the 2 slices of bread-step4-Enjoy!", preparation_time: 5, cooking_time: 0, …}
// title: "Breakfast at Tiffany's"
// updated_at: "2020-07-29T10:23:19.598Z"
// user_id: 1