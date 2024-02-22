import { fetchNotificationsSuccess, markAsRead, setNotificationFilter } from '../actions/notificationActionCreators';
import notificationReducer, { initialState } from './notificationReducer';

const fetchedData = [
  {
    id: 1,
    type: "default",
    value: "New course available"
  },
  {
    id: 2,
    type: "urgent",
    value: "New resume available"
  },
  {
    id: 3,
    type: "urgent",
    value: "New data available"
  }
];

const secondUnRead = [
  {
    id: 1,
    isRead: false,
    type: "default",
    value: "New course available",
  },
  {
    id: 2,
    isRead: false,
    type: "urgent",
    value: "New resume available",
  },
  {
    id: 3,
    isRead: false,
    type: "urgent",
    value: "New data available",
  },
];
const secondRead = [
  {
    id: 1,
    isRead: false,
    type: "default",
    value: "New course available",
  },
  {
    id: 2,
    isRead: true,
    type: "urgent",
    value: "New resume available",
  },
  {
    id: 3,
    isRead: false,
    type: "urgent",
    value: "New data available",
  },
];

const validFilters = [initialState.filter, 'DEFAULT', 'URGENT', 'something else', undefined];
const validNotifications = [ initialState.notifications, secondRead, secondUnRead];

describe('notificationReducer', () => {
  it("sets the new state's `notifications` array to be `action.data`,\
but every notification should have `isRead: false`,\
when the action type is `FETCH_NOTIFICATIONS_SUCCESS`", () => {
    expect(notificationReducer(undefined, fetchNotificationsSuccess(fetchedData))).toStrictEqual({ ...initialState, notifications: secondUnRead });

    for (const filter of validFilters) {
      for (const notifications of validNotifications) {
        const state = { filter, notifications };
        expect(notificationReducer(state, fetchNotificationsSuccess(fetchedData))).toStrictEqual({ ...state, notifications: secondUnRead });
      }
    }
  });
  it('returns `state`, but the 2nd notification marked as read,\
  when the action type is `MARK_AS_READ`', () => {
    for (const filter of validFilters) {
      let state = { filter, notifications: secondUnRead};
      expect(notificationReducer(state, markAsRead(2))).toStrictEqual({ ...state, notifications: secondRead});
      state = { filter, notifications: secondRead};
      expect(notificationReducer(state, markAsRead(2))).toStrictEqual({ ...state, notifications: secondRead});
    }
  });
  it('returns `state`, but with `filter: <filter string>`', () => {
    for (const setFilter of validFilters) {
      expect(notificationReducer(undefined, setNotificationFilter(setFilter))).toStrictEqual({ ...initialState, filter: setFilter });
    }

    for (const filter of validFilters) {
      for (const notifications of validNotifications) {
        const state = { filter, notifications };
        for (const setFilter of validFilters) {
          expect(notificationReducer(state, setNotificationFilter(setFilter))).toStrictEqual({ ...state, filter: setFilter });
        }
      }
    }
  });
});
