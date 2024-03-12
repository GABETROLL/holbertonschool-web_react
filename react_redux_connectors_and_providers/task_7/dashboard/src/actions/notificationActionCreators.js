import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS, SET_LOADING_STATE } from './notificationActionTypes';

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

/**
 * `loading` should be a boolean.
 */
export function setLoadingState(loading) {
  return { type: SET_LOADING_STATE, loading };
}

/**
 * Exactly the same as `fetchNotificationsSuccess`, two functions above,
 * but the name is different.
 */
export function setNotifications(data) {
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

/**
 * Thunk action creator.
 * - dispatches `setLoadingState(false)`
 * - fetches '/notifications.json' for the notifications array,
 * - If the fetch succeeds and its status is OK, dispatches `setNotifications(response.body)`
 * - dispatches `setLoadingState(false)`
 */
export function fetchNotifications() {
  return async (dispatch) => {
    dispatch(setLoadingState(true));

    try {
      const response = await fetch('/notifications.json');
      console.log('Notifications fetching response:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        dispatch(setNotifications(data));
      }
    } catch(error) {
      console.log('Fetching notifications has failed! error:', error);
    } finally {
      dispatch(setLoadingState(false));
    }
  }
}
