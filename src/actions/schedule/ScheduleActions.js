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

  createEvent = async (event, type) => {
    const _endpoint = `${ServiceConfig}/events`;
    const jwt = ActionsHelper.getCookie('user');
    let eventPayload = {
      title: event.title,
      event_type_id: event.eventType.id,
      date: event.date,
      begin_at: event.beginAt,
      end_at: event.endAt,
      comments: event.comments
    }

    switch (type) {
      case 'FOOD':
        eventPayload.food_event_attributes = { recipe_id: event.recipes.map(recipe => recipe.id)[0] };
        break;

      case 'COOKING':
        eventPayload.cooking_event_attributes = {};
        break;

      case 'SHOPPING':
        eventPayload.shopping_event_attributes = {
          recipe_ids: event.recipes.map(recipe => recipe.id),
          date_frequency_id: event.dateFrequency.id
        };
        break;
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