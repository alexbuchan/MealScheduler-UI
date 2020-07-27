import Dispatcher from '../../dispatcher/dispatcher';
import Constants from '../../constants/scheduleConstants';
import ScheduleStore from './ScheduleStore';

jest.mock('../../dispatcher/dispatcher');

describe('ScheduleStore', () => {
  let callback;

  beforeEach(() => {
    callback = Dispatcher.register.mock.calls[0][0];
  });

  it('initializes ScheduleStore with default values', () => {
    const getScheduleState = ScheduleStore.getScheduleState();
    expect(getScheduleState).toEqual({ schedule: [] });
  });

  describe('#getScheduleData', () => {
    beforeEach(() => {
      const getScheduleMock = {
        actionType: Constants.GET_SCHEDULE_DATA,
        data: ['contact1', 'contact2']
      };

      callback(getScheduleMock);
    });

    it('adds schedule to scheduleState', () => {
      const schedule = ScheduleStore.getScheduleState().schedule;
      expect(schedule).toEqual(['contact1', 'contact2'])
    });
  });
});