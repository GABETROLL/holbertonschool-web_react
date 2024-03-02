import { LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { fromJS } from 'immutable';

export const initialState = fromJS({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {
    email: '',
    password: '',
  },
});

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
      return state.setIn(['user', 'email'], action.email).setIn(['user', 'password'], action.password);
    }
    case LOGIN_SUCCESS: {
      return state.set('isUserLoggedIn', true);
    }
    case LOGIN_FAILURE: {
      return state.set('isUserLoggedIn', false);
    }
    case LOGOUT: {
      return state.set('isUserLoggedIn', false);
    }
    default: {
      return state;
    }
  };
}
