import { bindActionCreators} from 'redux';
import store from './store';
import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';

export const login = bindActionCreators((email, password) => ({ type: LOGIN, user: { email, password } }), store.dispatch);
export const logout = bindActionCreators(() => ({ type: LOGOUT }), store.dispatch);
export const displayNotificationDrawer = bindActionCreators(() => ({ type: DISPLAY_NOTIFICATION_DRAWER }), store.dispatch);
export const hideNotificationDrawer = bindActionCreators(() => ({ type: HIDE_NOTIFICATION_DRAWER }), store.dispatch);
