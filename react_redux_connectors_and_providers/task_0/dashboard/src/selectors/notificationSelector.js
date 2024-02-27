import { Map } from 'immutable';

/**
 * Assumes `state` is an `Immutable.Map`,
 * with the same structure as `initialState` from `../reducers/notificationReducer`.
 *
 * Returns the filter type, which SHOULD be 'DEFAULT' or 'URGENT'.
 */
export function filterTypeSelected(state) {
  return state.get('filter');
}

/**
 * Assumes `state` is an `Immutable.Map`,
 * with the same structure as `initialState` from `../reducers/notificationReducer`.
 *
 * Returns all of the notifications in the state, as an object of { id: notification }.
 */
export function getNotifications(state) {
  return state.getIn(['entities', 'notifications']) || Map();
}

/**
 * Assumes `state` is an `Immutable.Map`,
 * with the same structure as `initialState` from `../reducers/notificationReducer`.
 * 
 * Returns all of the notifications in the state that have not been read (have attribute `isRead: false`),
 * as an object of { id: notification }.
 */
export function getUnreadNotifications(state) {
  return (
    state.getIn(['entities', 'notifications']) || Map()
  ).filter(notification => !(notification.isRead));
}
