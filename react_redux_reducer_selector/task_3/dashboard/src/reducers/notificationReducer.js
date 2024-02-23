import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS } from '../actions/notificationActionTypes';

export const initialState = {
  notifications: [],
  filter: 'DEFAULT',
};

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
      return {
        ...state,
        notifications: action.data.map(notification => ({
          ...notification,
          isRead: false,
        })),
      };
    }
    case MARK_AS_READ: {
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          isRead: notification.id === action.index ? true : notification.isRead,
        })),
      };
    }
    case SET_TYPE_FILTER: {
      return { ...state, filter: action.filter };
    }
    default: {
      return state;
    }
  }
}
