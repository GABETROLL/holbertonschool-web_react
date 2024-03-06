import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';

export function login(email, password) {
  return { type: LOGIN, user: { email, password } };
}
export function logout() {
  return { type: LOGOUT };
}
export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}
export function loginFailure() {
  return { type: LOGIN_FAILURE };
}
export function displayNotificationDrawer() {
  return { type: DISPLAY_NOTIFICATION_DRAWER };
}
export function hideNotificationDrawer() {
  return { type: HIDE_NOTIFICATION_DRAWER };
}

export function boundLogin(email, password) {
  return dispatch(login(email, password));
}
export function boundLogout() {
  return dispatch(logout());
}
export function boundLoginSuccess() {
  return dispatch(loginSuccess());
}
export function boundLoginFailure() {
  return dispatch(loginFailure());
}
export function boundDisplayNotificationDrawer() {
  return dispatch(displayNotificationDrawer());
}
export function boundHideNotificationDrawer() {
  return dispatch(hideNotificationDrawer());
}

export function loginRequest(email, password) {
  return (dispatch) => {
    dispatch(login(email, password));
    fetch('/login-success.json')
      .then((response) => {
        if (response.ok) {
          console.log('Login fetch request OK!');
          dispatch(loginSuccess());
        } else {
          console.log('Login fetch request NOT OK! status:', response.status, response.statusText);
          dispatch(loginFailure());
        }
      })
      .catch((error) => {
          console.log('Login fetch request failed:', error);
          dispatch(loginFailure());
      });
  };
}
