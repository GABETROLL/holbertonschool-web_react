import {
  SET_LOADING_STATE, FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ, SET_TYPE_FILTER
} from '../actions/notificationActionTypes';
import { fromJS } from 'immutable';
import { notificationsNormalizer } from '../schema/notifications';

export const initialState = fromJS({
  loading: false,
  filter: 'DEFAULT',
  result: [],
  entities: {
    users: { },
    messages: { },
    notifications: { },
  },
});

/**
 * `state` is expected to have the same shape as `initialState` (or more),
 * and to be a DEEPLY Immutable object (an object wrapped by `fromJS`).
 *
 * `action` is expected to be one of the actions returned by the action creators in
 * `../actions/notificationActionCreators`, or at the very least, expected to contain this shape:
 * { type: 'MACRO_CASE_ACTION_TYPE' }
 *
 * If `action` is not specified, `state` will be returned.
 * 
 * `action.type: SET_LOADING_STATE`: will set the new state's `loading`
 * to be `action.loading`. ASSUMES `action.loading` is a boolean.
 *
 * `action.type: FETCH_NOTIFICATIONS_SUCCESS` will result in the new state being DEEPLY merged with
 * `fromJS(notificationsNormalizer(action.data))`. ASSUMES `action.data` is an array of Notification objects,
 * WITH THE SAME STRUCTURE AS ``../../../notifications.json``:
 *
 * [Notification]
 *
 * Notification = { id: string, author: User, context: Message };
 *
 * User = {
 *   id: string,
 *   name: {
 *     first: string,
 *     last: string,
 *   },
 *   email: email string,
 *   picture: URL string,
 *   age: integer,
 * };
 *
 * Message = {
 *   guid: string,
 *   isRead: boolean,
 *   type: 'default' | 'urgent',
 *   value: string,
 * };
 *
 * `action.type: MARK_AS_READ`, will result in the notification with `id: action.index`
 * to have the property `isRead: true`. ASSUMES `action.index` is an integer,
 * AND IS THE ID OF THE NOTIFICATION TO MARK AS READ.
 *
 * `action.type: SET_TYPE_FILTER` will result in `filter: action.filter`. ASSUMES `action.filter`
 * is 'DEFAULT' | 'URGENT'.
 *
 * SHOULD return: Map {
 *   filter: action.filter,
 *   result: idString[],
 *   entities: {
 *     users: {
 *       idString: User,
 *     },
 *     messages: {
 *       guidString: Message,
 *     },
 *     notifications: {
 *       idString: Notification,
 *     },
 *   }
 * }
 */
export default function notificationReducer(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case SET_LOADING_STATE: {
      return state.set('loading', action.loading);
    }
    case FETCH_NOTIFICATIONS_SUCCESS: {
      const mapped = action.data.map(notification => ({ ...notification, isRead: false }));
      const normalized = notificationsNormalizer(mapped);
      const immutableNormalized = fromJS(normalized);
      const mergedState = state.mergeDeep(immutableNormalized);

      // console.log(state, mapped, normalized, immutableNormalized, mergedState);

      return mergedState;
    }
    case MARK_AS_READ: {
      return state.setIn(['entities', 'messages', action.index.toString(), 'isRead'], true);
    }
    case SET_TYPE_FILTER: {
      return state.set('filter', action.filter);
    }
    default: {
      return state;
    }
  }
}
