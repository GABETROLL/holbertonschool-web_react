import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';
import fetch from 'node-fetch';

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
export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}
export function loginFailure() {
  return { type: LOGIN_FAILURE };
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
export function boundLoginSuccess() {
  return dispatch(loginSuccess());
}
export function boundLoginFailure() {
  return dispatch(loginFailure());
}

function loginRequest(email, password) {
  fetch('/login-success.json')
    .then(() => {
      boundLoginSuccess();
      boundLogin(email, password);
    })
    .catch(() => {
      boundLoginFailure();
    });
}
