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

const withSecondUnRead = {
  filter: '',
  notifications: [
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
  ],
};
const withSecondRead = {
  filter: '',
  notifications: [
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
  ],
};

describe('notificationReducer', () => {
  it("sets the new state's `notifications` array to be `action.data`,\
but every notification should have `isRead: false`,\
when the action type is `FETCH_NOTIFICATIONS_SUCCESS`", () => {
    expect(notificationReducer(undefined, fetchNotificationsSuccess(fetchedData))).toStrictEqual(withSecondUnRead);
    expect(notificationReducer(initialState, fetchNotificationsSuccess(fetchedData))).toStrictEqual(withSecondUnRead);
    expect(notificationReducer(withSecondRead, fetchNotificationsSuccess(fetchedData))).toStrictEqual(withSecondUnRead);
    expect(notificationReducer(withSecondUnRead, fetchNotificationsSuccess(fetchedData))).toStrictEqual(withSecondUnRead);
  });
  it('returns `state`, but the 2nd notification marked as read,\
  when the action type is `MARK_AS_READ`', () => {
    expect(notificationReducer(withSecondUnRead, markAsRead(2))).toStrictEqual(withSecondRead);
    expect(notificationReducer(withSecondRead, markAsRead(2))).toStrictEqual(withSecondRead);
  });
  it('returns `state`, but with `filter: <filter string>`', () => {
    expect(notificationReducer(initialState, setNotificationFilter('DEFAULT'))).toStrictEqual({ ...initialState, filter: 'DEFAULT' });
    expect(notificationReducer(initialState, setNotificationFilter('URGENT'))).toStrictEqual({ ...initialState, filter: 'URGENT' });
    expect(notificationReducer(initialState, setNotificationFilter('blahblahbah'))).toStrictEqual({ ...initialState, filter: 'blahblahbah' });
  });
});
