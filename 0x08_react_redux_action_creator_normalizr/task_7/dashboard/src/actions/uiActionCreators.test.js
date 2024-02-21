import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';
import * as uiActionCreators from './uiActionCreators';
import fetchMock from 'fetch-mock';

describe('login', () => {
  it("called with arguments email: 'a' and password: 'b' should return: { type: LOGIN, user: { email: 'a', password: 'b' } }", () => {
    expect(uiActionCreators.login('a', 'b')).toStrictEqual({ type: LOGIN, user: { email: 'a', password: 'b' } });
  });
});


describe('logout', () => {
  it('should return: { type: LOGOUT}', () => {
    expect(uiActionCreators.logout()).toStrictEqual({ type: LOGOUT });
  });
});

describe('displayNotificationDrawer', () => {
  it('should return: { type: DISPLAY_NOTIFICATION_DRAWER}', () => {
    expect(uiActionCreators.displayNotificationDrawer()).toStrictEqual({ type: DISPLAY_NOTIFICATION_DRAWER });
  });
});

describe('hideNotificationDrawer', () => {
  it('should return: { type: HIDE_NOTIFICATION_DRAWER}', () => {
    expect(uiActionCreators.hideNotificationDrawer()).toStrictEqual({ type: HIDE_NOTIFICATION_DRAWER });
  });
});

describe('loginRequest', () => {
  it('dispatches the LOGIN and LOGIN_SUCCESS actions when the login response is successful', () => {
    fetchMock.mock('/login-success.json', 200);
    jest.spyOn(uiActionCreators, 'boundLogin');
    jest.spyOn(uiActionCreators, 'boundLoginSuccess');

    uiActionCreators.loginRequest('a', 'b');

    expect(uiActionCreators.boundLogin.mock.calls).toStrictEqual([['a', 'b']]);
    expect(uiActionCreators.boundLoginSuccess.mock.calls).toHaveLength(1);

    uiActionCreators.boundLogin.mockRestore();
    uiActionCreators.boundLoginSuccess.mockRestore();
  });

  it('dispatches the LOGIN and LOGIN_FAILURE actions when the login response indicates failure', () => {
    fetchMock.mock('/login-success.json', 500);
    jest.spyOn(uiActionCreators, 'boundLogin');
    jest.spyOn(uiActionCreators, 'boundLoginFailure');

    uiActionCreators.loginRequest('a', 'b');

    expect(uiActionCreators.boundLogin.mock.calls).toStrictEqual([['a', 'b']]);
    expect(uiActionCreators.boundLoginFailure.mock.calls).toHaveLength(1);

    uiActionCreators.boundLogin.mockRestore();
    uiActionCreators.boundLoginFailure.mockRestore();
  });
});
