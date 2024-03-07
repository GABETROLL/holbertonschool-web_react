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
  return (dispatch) => {
    dispatch(setLoadingState(true));

    fetch('/notifications.json')
      .then((response) => {
        console.log('Notifications fetching response:', response.status, response.statusText);
        if (response.ok) {
          // WATCH OUT! This mays not have been automatically interpreted as a JSON object!
          // You may need to check the `response.headers` (inclusive)or parse the `response.body`!
          console.log(response.body);
          dispatch(setNotifications(response.body));
        }
      })
      .catch((error) => {
        console.log('Fetching notifications has failed! error:', error);
      })
      .finally(() => {
        dispatch(setLoadingState(false));
      });
  }
}
