import React from 'react';
import { Link } from 'react-router-dom';

const EventCardSidebarPanel = ({ event }) => {
  const eventRecipes = () => {
    if (event.event_type) {
      return (
        <div className='event-card-sidebar-data'>
          <p className='event-card-sidebar-recipe-label'>Recipes:</p>
          <div className='event-card-sidebar-recipes'>
            { event.recipes.map((recipe, index) => <Link key={ index } to={ `/recipes/${recipe.id}` } className='event-card-sidebar-recipe-link'>{ recipe.name }</Link>) }
          </div>
        </div>
      );
    }

    return null;
  }

  const eventComments = () => {
    return (
      <div className='event-card-sidebar-comments-wrapper'>
        <p className='event-card-sidebar-comments'>{ event.comments }</p>
      </div>
    );
  }

  return (
    <div className={`event-card-sidebar-panel`}>
      { eventComments() }
      { eventRecipes() }
    </div>
  );
}
 
export default EventCardSidebarPanel;