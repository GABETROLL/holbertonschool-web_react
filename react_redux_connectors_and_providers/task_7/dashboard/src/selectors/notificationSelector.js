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
 * Should return all of the message VALUES from `notificationsState.getIn(['entities', 'messages'])`
 * as an `Immutable.Seq.Indexed<POJS Notification>`
 */
export function getNotifications(notificationsState) {
  return (notificationsState.getIn(['entities', 'messages']) || Map())
    .valueSeq()
    .map(notification => notification.toJS());
}

/**
 * Assumes `notificationsState` is an `Immutable` object,
 * coming from `../reducers/notificationReducer`.
 *
 * Should return all of the message VALUES THAT HAVE NOT BEEN READ from `notificationsState.getIn(['entities', 'messages'])`
 * as an `Immutable.Seq.Indexed<POJS Notification>`
 */
export function getUnreadNotifications(notificationsState) {
  return getNotifications(notificationsState)
    .filter(notification => !(notification.isRead));
}
