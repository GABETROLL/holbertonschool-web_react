import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { fromJS } from 'immutable';

export const initialState = fromJS({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: null, // or { email: '', password: '' }
});

/**
 * If the `action` is of type LOGIN,
 * this reducer assumes that `action.user` is a valid POJS of format:
 * { email: string, password: string }.
 */
export default function uiReducer(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER: {
      return state.set('isNotificationDrawerVisible', true);
    }
    case HIDE_NOTIFICATION_DRAWER: {
      return state.set('isNotificationDrawerVisible', false);
    }
    case LOGIN: {
      return state.set('user', fromJS(action.user));
    }
    case LOGIN_SUCCESS: {
      return state.set('isUserLoggedIn', true);
    }
    case LOGIN_FAILURE: {
      return state.set('isUserLoggedIn', false);
    }
    case LOGOUT: {
      return state.set('isUserLoggedIn', false).set('user', null);
    }
    default: {
      return state;
    }
  };
}
