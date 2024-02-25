import { fetchNotificationsSuccess, markAsRead, setNotificationFilter } from '../actions/notificationActionCreators';
import notificationReducer from './notificationReducer';
import { Map } from 'immutable';

const fetchedData = [
  {
    id: 1,
    type: 'default',
    value: 'New course available',
  },
  {
    id: 2,
    type: 'urgent',
    value: 'New resume available',
  },
  {
    id: 3,
    type: 'urgent',
    value: 'New data available',
  },
];

const fetchedStateResult = [1, 2, 3];
const secondUnRead = {
  '1': {
    id: 1,
    isRead: false,
    type: 'default',
    value: 'New course available',
  },
  '2': {
    id: 2,
    isRead: false,
    type: 'urgent',
    value: 'New resume available',
  },
  '3': {
    id: 3,
    isRead: false,
    type: 'urgent',
    value: 'New data available',
  },
};
const secondRead = {
  '1': {
    id: 1,
    isRead: false,
    type: 'default',
    value: 'New course available',
  },
  '2': {
    id: 2,
    isRead: true,
    type: 'urgent',
    value: 'New resume available',
  },
  '3': {
    id: 3,
    isRead: false,
    type: 'urgent',
    value: 'New data available',
  },
};
const fetchedState = {
  filter: 'DEFAULT',
  result: fetchedStateResult,
  entities: {
    notifications: secondUnRead,
  },
};

const filters = ['DEFAULT', 'URGENT', 'OTHER', undefined];

describe('notificationReducer', () => {
  it("merges the normalized version of `action.data` with the state (using the normalizer ),\
but with each notification having `isRead: false`, when the action type is 'FETCH_NOTIFICATIONS_SUCCESS", () => {
    for (const filter of filters) {
      const prevState = Map({ filter });

      const result = notificationReducer(prevState, fetchNotificationsSuccess(fetchedData));
      expect(result.get('result')).toStrictEqual(fetchedStateResult);
      expect(result.getIn(['entities', 'notifications'])).toStrictEqual(secondUnRead);

      for (const courses of [secondUnRead, secondRead]) {
        const prevState = Map({ filter, result: fetchedStateResult, entities: { courses } });

        const result = notificationReducer(prevState, fetchNotificationsSuccess(fetchedData));
        expect(result.get('result')).toStrictEqual(fetchedStateResult);
        expect(result.getIn(['entities', 'notifications'])).toStrictEqual(secondUnRead);
      }
    }
  });

  it('(ONLY) marks the 2nd notification as read, when the action type is `MARK_AS_READ`', () => {
    // test with previous state having the 2nd notification unread
    let state = notificationReducer(Map(fetchedState), markAsRead(2));
    expect(state.getIn(['entities', 'notifications'])).toStrictEqual(secondRead);

    // test with previous state having the 2nd notification read
    state = notificationReducer(state, markAsRead(2));
    expect(state.getIn(['entities', 'notifications'])).toStrictEqual(secondRead);
  });

  it("sets `filter` to the assigned filter, and defaults `filter` to 'DEFAULT'", () => {
    for (const nextFilter of filters) {
      let state = notificationReducer(undefined, setNotificationFilter(nextFilter));
      expect(state.get('filter')).toBe(nextFilter);

      for (const prevFilter of filters) {
        const state = notificationReducer(Map({ ...fetchedState, filter: prevFilter }), setNotificationFilter(nextFilter));
        expect(state.get('filter')).toBe(nextFilter);
      } 
    }
  });
});
