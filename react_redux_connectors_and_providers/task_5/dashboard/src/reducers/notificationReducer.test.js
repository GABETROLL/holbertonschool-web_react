import { fetchNotificationsSuccess, markAsRead, setNotificationFilter, setNotifications } from '../actions/notificationActionCreators';
import { fromJS } from 'immutable';
import notificationReducer, { initialState } from './notificationReducer';

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
  it("DEEPLY merges the normalized version of `action.data` (notification obj array) with the state (using the normalizer), \
(the new notifications added from `action.data` shouldn't replace the old ones), \
but with each notification having `isRead: false`, when the action type is 'FETCH_NOTIFICATIONS_SUCCESS", () => {
    const fetchedData = [
      {
        id: 0,
        type: 'default',
        value: 'This is the first array of notifications!',
      },
      {
        id: 1,
        type: 'urgent',
        value: 'This is the second array of notifications!',
      },
      {
        id: 2,
        type: 'other',
        value: 'Just making sure that when a new `FETCH_NOTIFICATIONS_SUCCESS` action is dispatched...',
      },
      {
        id: 3,
        type: 'default',
        value: 'The reducer will normalize and merge the new notifications without replacing the old ones!',
      },
      {
        id: 4,
        type: 'urgent',
        value: 'hello',
      },
    ];
    const mergedData = {
      '0': {
        id: 0,
        isRead: false,
        type: 'default',
        value: 'This is the first array of notifications!',
      },
      '1': {
        id: 1,
        isRead: false,
        type: 'urgent',
        value: 'This is the second array of notifications!',
      },
      '2': {
        id: 2,
        isRead: false,
        type: 'other',
        value: 'Just making sure that when a new `FETCH_NOTIFICATIONS_SUCCESS` action is dispatched...',
      },
      '3': {
        id: 3,
        isRead: false,
        type: 'default',
        value: 'The reducer will normalize and merge the new notifications without replacing the old ones!',
      },
      '4': {
        id: 4,
        isRead: false,
        type: 'urgent',
        value: 'hello',
      },
    };

    let result = notificationReducer(initialState, setNotifications([fetchedData[0]]));
    expect(result.get('result').toJS()).toStrictEqual([0]);
    expect(result.getIn(['entities', 'notifications']).toJS()).toStrictEqual({ '0': mergedData['0'] });
  
    result = notificationReducer(result, setNotifications([fetchedData[1], fetchedData[2], fetchedData[3]]));
    expect(result.get('result').toJS()).toStrictEqual([0, 1, 2, 3]);
    expect(result.getIn(['entities', 'notifications']).toJS()).toStrictEqual({
      '0': mergedData['0'],
      '1': mergedData['1'],
      '2': mergedData['2'],
      '3': mergedData['3'],
    });
  
    result = notificationReducer(result, setNotifications([fetchedData[4]]));
    expect(result.get('result').toJS()).toStrictEqual([0, 1, 2, 3, 4]);
    expect(result.getIn(['entities', 'notifications']).toJS()).toStrictEqual(mergedData);
  
    result = notificationReducer(result, setNotifications([]));
    expect(result.get('result').toJS()).toStrictEqual([0, 1, 2, 3, 4]);
    expect(result.getIn(['entities', 'notifications']).toJS()).toStrictEqual(mergedData);
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
