import { MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters } from './notificationActionTypes';
import { markAsRead, setNotificationFilter } from './notificationActionCreators';

describe('markAsRead', () => {
  it('returns { type: MARK_AS_READ, index: 1 }, when being called with argument: index=1', () => {
    expect(markAsRead(1)).toStrictEqual({
      type: MARK_AS_READ,
      index: 1,
    });
  });
});

describe('setNotificationFilter', () => {
  it("returns { type: SET_TYPE_FILTER, filter: <corresponding filter> }, when called with a `filter` argument from `NotificationTypeFilters`", () => {
    for (const filter of NotificationTypeFilters) {
      expect(setNotificationFilter(filter)).toStrictEqual({
        type: SET_TYPE_FILTER,
        filter,
      });
    }
  });
});
