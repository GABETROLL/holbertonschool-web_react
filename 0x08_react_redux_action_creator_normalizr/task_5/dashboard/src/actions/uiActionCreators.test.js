import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';
import { login, logout, displayNotificationDrawer, hideNotificationDrawer } from './uiActionCreators';

describe('login', () => {
  it("called with arguments email: 'a' and password: 'b' should return: { type: LOGIN, user: { email: 'a', password: 'b' } }", () => {
    expect(login('a', 'b')).toStrictEqual({ type: LOGIN, user: { email: 'a', password: 'b' } });
  });
});


describe('logout', () => {
  it('should return: { type: LOGOUT}', () => {
    expect(logout()).toStrictEqual({ type: LOGOUT });
  });
});

describe('displayNotificationDrawer', () => {
  it('should return: { type: DISPLAY_NOTIFICATION_DRAWER}', () => {
    expect(displayNotificationDrawer()).toStrictEqual({ type: DISPLAY_NOTIFICATION_DRAWER });
  });
});

describe('hideNotificationDrawer', () => {
  it('should return: { type: HIDE_NOTIFICATION_DRAWER}', () => {
    expect(hideNotificationDrawer()).toStrictEqual({ type: HIDE_NOTIFICATION_DRAWER });
  });
});
