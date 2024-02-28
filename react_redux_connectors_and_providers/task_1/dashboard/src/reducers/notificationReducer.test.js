import { fetchNotificationsSuccess, markAsRead, setNotificationFilter } from '../actions/notificationActionCreators';
import { fromJS } from 'immutable';
import notificationReducer from './notificationReducer';

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
  it("merges the normalized version of `action.data` with the state (using the normalizer), \
but with each notification having `isRead: false`, when the action type is 'FETCH_NOTIFICATIONS_SUCCESS", () => {
    for (const filter of filters) {
      const prevState = fromJS({ filter });

      const result = notificationReducer(prevState, fetchNotificationsSuccess(fetchedData));

      expect(result.get('result').toJS()).toStrictEqual(fetchedStateResult);
      expect(result.getIn(['entities', 'notifications']).toJS()).toStrictEqual(secondUnRead);

      for (const notifications of [secondUnRead, secondRead]) {
        const prevState = fromJS({ filter, result: fetchedStateResult, entities: { notifications } });

        const result = notificationReducer(prevState, fetchNotificationsSuccess(fetchedData));

        expect(result.get('result').toJS()).toStrictEqual(fetchedStateResult);
        expect(result.getIn(['entities', 'notifications']).toJS()).toStrictEqual(secondUnRead);
      }
    }
  });

  it('(ONLY) marks the 2nd notification as read, when the action type is `MARK_AS_READ`', () => {
    // test with previous state having the 2nd notification unread
    let state = notificationReducer(fromJS(fetchedState), markAsRead(2));
    expect(state.getIn(['entities', 'notifications']).toJS()).toStrictEqual(secondRead);

    // test with previous state having the 2nd notification read
    state = notificationReducer(fromJS({ ...fetchedState, entities: { notifications: secondRead } }), markAsRead(2));
    expect(state.getIn(['entities', 'notifications']).toJS()).toStrictEqual(secondRead);
  });

  it("sets `filter` to the assigned filter", () => {
    for (const nextFilter of filters) {
      let state = notificationReducer(undefined, setNotificationFilter(nextFilter));
      expect(state.get('filter')).toBe(nextFilter);

      for (const prevFilter of filters) {
        const state = notificationReducer(fromJS({ ...fetchedState, filter: prevFilter }), setNotificationFilter(nextFilter));
        expect(state.get('filter')).toBe(nextFilter);
      }
    }
  });

  it("defaults `filter` to 'DEFAULT'", () => {
    expect(notificationReducer(undefined).get('filter')).toBe('DEFAULT');
  });
});
