import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  event: PropTypes.object,
  title: PropTypes.bool
};

const EventCard = ({ event, title }) => {
  const foodEventRecipe = () => {
    return (
      <div className='food-event-data'>
        <p className='recipe-label'>Recipe:</p>
        <a href='#' className='recipe-link'>{ event.recipe.name }</a>
      </div>
    );
  }

  const shoppingEventRecipes = () => {
    return (
      <div className='shopping-event-data'>
        <p>Recipes:</p>
        <div className='shopping-event-recipes'>{ event.recipes.map((recipe, index) => <a key={ index } href='#' className='recipe-link'>{ recipe.name }</a>) }</div>
      </div>
    );
  }

  const specificEventData = () => {
    switch(event.event_type) {
      case 'FOOD':
        return foodEventRecipe();
      case 'SHOPPING':
        return shoppingEventRecipes();
    }
  }

  const eventCardColor = () => {
    switch(event.event_type) {
      case 'FOOD':
        return '#4fd44fEE';
      case 'SHOPPING':
        return '#e85f5fEE';
      default:
        return 'gray';
    }
  }

  const eventCardTitle = () => {
    if (title) {
      return (
        <div className='event-title-wrapper'>
          <h5 className='event-title'>{ event.title }</h5>
        </div>
      );
    }

    return null;
  }

  return (
    <div className={ `event-card` } style={ { backgroundColor: eventCardColor() } }>
      { eventCardTitle() }

      <p>Date: { event.date }</p>

      <div className='event-begin-end-wrapper'>
        <p>Starts at: { event.begin_at }</p>
        <p>Ends at: { event.end_at }</p>
      </div>

      { specificEventData() }
    </div>
  );
}

EventCard.defaultProps = {
  title: true
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