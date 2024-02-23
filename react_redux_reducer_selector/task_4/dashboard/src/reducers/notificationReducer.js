import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS } from '../actions/notificationActionTypes';
import { Map, merge } from 'immutable';
import { notificationsNormalizer } from '../schema/notifications';

export const initialState = Map({
  notifications: {},
  filter: 'DEFAULT',
});

/**
 * `state` is expected to have the same shape as `initialState`,
 * and `action` is expected to be one of the actions returned by the action creators in
 * `../actions/notificationActionCreators`.
 *
 * If `action` is not specified, `state` will be returned.
 *
 * `action.type: FETCH_NOTIFICATIONS_SUCCESS` will result in the new `notifications` array
 * to be `action.data`, but each notification inside will have the property `isRead: false`.
 *
 * `action.type: MARK_AS_READ`, will result in the notification with `id: action.index`
 * to have the property `isRead: true` .
 *
 * `action.type: SET_TYPE_FILTER` will result in `filter: action.filter`.
 *
 * @returns Array<{ id: integer, type: 'default' | 'urgent', value: string, isRead: boolean }>
 */
export default function notificationReducer(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS: {
      return state.merge(state, notificationsNormalizer(action.data));
      // TODO: add `isRead: false` on all of them
    }
    case MARK_AS_READ: {
      return state.setIn(['entities', 'notifications', action.index, 'isRead'], true);
    }
    case SET_TYPE_FILTER: {
      return state.set('filter', action.filter);
    }
    default: {
      return state;
    }
  }
}
