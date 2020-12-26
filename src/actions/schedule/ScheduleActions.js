require('es6-promise').polyfill();
const request = require('axios');

import ActionDispatch from './ActionDispatch';
import ActionsHelper from '../ActionsHelper';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';
import ServiceConfig from '../../services/config';

class ScheduleActions {
  getSchedule = async (schedule) => {
    const _endpoint = `${ServiceConfig}/scheduler`;
    const jwt = ActionsHelper.getCookie('user');

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.post(_endpoint, { scheduler: schedule }, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      ActionDispatch.dispatchScheduleData(response.data);
    }
  }

  specificEventData = (event) => {
    let data;

    switch (event.eventType) {
      case 'FoodEvent':
        data = { recipe_ids: event.recipes.map(recipe => recipe.id) };
        break;
      case 'CookingEvent':
        data = {
          recipe_id: event.recipes.map(recipe => recipe.id)[0]
        }
      case 'ShoppingEvent':
        data = {
          date_frequency_id: event.dateFrequency.id,
          recipe_ids: event.recipes.map(recipe => recipe.id)
        };
        break;
    }

    return data;
  }

  createEvent = async (event, type) => {
    const _endpoint = `${ServiceConfig}/events`;
    const jwt = ActionsHelper.getCookie('user');
    let eventPayload = {
      event: {
        title: event.title,
        eventable_type: event.eventType,
        date: event.date,
        begin_at: event.beginAt,
        end_at: event.endAt,
        comments: event.comments
      },
      specific_event_data: this.specificEventData(event)
    }

    let error, response;
    [error, response] = await ActionsHelper.asyncHelper(
      request.post(_endpoint, { event: eventPayload }, { headers: { Authorization: `Bearer ${jwt}` } })
    );

    if (error) {
      FlashMessageActions.dispatchErrorMessage(error.response);
    } else {
      FlashMessageActions.dispatchSuccessMessage(response.data);
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      this.getSchedule({ month: monthNames[new Date().getMonth()], year: new Date().getFullYear() });
    }
  }
}

export default new ScheduleActions();