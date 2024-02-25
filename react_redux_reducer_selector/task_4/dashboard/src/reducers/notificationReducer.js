import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS } from '../actions/notificationActionTypes';
import { Map } from 'immutable';
import { notificationsNormalizer } from '../schema/notifications';

export const initialState = Map({
  filter: 'DEFAULT',
  result: [],
  entities: { },
});

/**
 * `state` is expected to have the same shape as `initialState` (or more),
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
      const mapped = action.data.map(notification => ({ ...notification, isRead: false }));
      const normalized = notificationsNormalizer(mapped);
      console.log(mapped, normalized, state);
      const mergedState = state.merge(normalized);


      return mergedState;
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
