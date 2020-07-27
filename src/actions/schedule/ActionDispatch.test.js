import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/scheduleConstants';
import ActionDispatch from './ActionDispatch';

jest.mock('../../dispatcher/dispatcher');

describe('ActionDispatch', () => {
  describe('#dispatchScheduleData', () => {
    it('calls API and retrieves all schedule data', async () => {  
      const data = ['contact1', 'contact2'];
      
      ActionDispatch.dispatchScheduleData(data);


      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.GET_SCHEDULE_DATA,
        data
      });
    });
  });
});