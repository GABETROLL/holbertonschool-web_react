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
 * Assumes `notificationsState` is an `Immutable` object,
 * coming from `../reducers/notificationReducer`.
 *
 * Should return all of the messages from `state.getIn(['entities', 'messages'])`,
 * as an Immutable.Map { id: notification }.
 */
export function getNotifications(notificationsState) {
  return notificationsState.getIn(['entities', 'messages']) || Map();
}

/**
 * Assumes `notificationsState` is an `Immutable` object,
 * coming from `../reducers/notificationReducer`.
 * 
 * Returns all of the messages from `state.getIn(['entities', 'messages'])` that have not been read
 * (have attribute `isRead: false`), as an Array<Notification>.
 */
export function getUnreadNotifications(notificationsState) {
  return (
    notificationsState.getIn(['entities', 'messages']) || Map()
  ).valueSeq().toJS().filter(notification => !(notification.isRead));
}
