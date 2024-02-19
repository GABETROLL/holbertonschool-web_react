import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';

export function login(email, password) {
  return { type: LOGIN, user: { email, password } };
}
export function logout() {
  return { type: LOGOUT };
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
export function boundDisplayNotificationDrawer() {
  return dispatch(displayNotificationDrawer());
}
export function boundHideNotificationDrawer() {
  return dispatch(hideNotificationDrawer());
}

function loginRequest(email, password) {
  dispatch(login(email, password));
  // TODO: fetch the API and dispatch either `loginSuccess` or `loginFailure`.
}
