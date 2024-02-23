import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';

/**
 * `index` is expected to be an int.
 */
export function markAsRead(index) {
  return { type: MARK_AS_READ, index };
}
/**
 * `filter` is expected to be 'DEFAULT' or 'URGENT'.
 */
export function setNotificationFilter(filter) {
  return { type: SET_TYPE_FILTER, filter };
}
/**
 * `data` is expected to be an array of notification objects:
 * [ { id: integer, type: 'default' | 'urgent', value: string } ]
 */
export function fetchNotificationsSuccess(data) {
  return { type: FETCH_NOTIFICATIONS_SUCCESS, data };
}

export function boundMarkAsRead(index) {
  return dispatch(markAsRead(index));
}
export function boundSetNotificationFilter(filter) {
  return dispatch(setNotificationFilter(filter));
}
export function boundFetchNotificationsSuccess(data) {
  return dispatch(fetchNotificationsSuccess(data));
}
