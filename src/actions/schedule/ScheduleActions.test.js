import request from "axios";
import ScheduleActions from './ScheduleActions';
import ActionDispatch from './ActionDispatch';
import FlashMessageActions from '../FlashMessageActions/FlashMessageActions';

jest.mock('./ActionDispatch');
jest.mock('../FlashMessageActions/FlashMessageActions');
jest.mock('axios');

describe('ScheduleActions', () => {
  describe('#getSchedule', () => {
    describe('when API retrieves data correctly', () => {
      it('calls action dispatch method with all schedule data', async () => {
        const response = { data: ['contact1', 'contact2'] };
        request.get.mockImplementation(() => Promise.resolve(response));
        await ScheduleActions.getSchedule();

        expect(ActionDispatch.dispatchScheduleData).toHaveBeenCalledWith(response.data);
      });
    });

    describe('when API returns an error', () => {
      it('calls FlashMessage dispatch error action with error object', async () => {
        const error = { response: { data: { error: 'error1' } } };
        await request.get.mockImplementation(() => Promise.reject(error));
        await ScheduleActions.getSchedule();

        expect(FlashMessageActions.dispatchErrorMessage).toHaveBeenCalledWith(error.response);
      });
    });
  });
});