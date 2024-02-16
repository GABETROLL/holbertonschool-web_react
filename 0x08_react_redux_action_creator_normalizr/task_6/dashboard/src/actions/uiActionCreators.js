import { bindActionCreators} from 'redux';
import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';

export const login = bindActionCreators((email, password) => ({ type: LOGIN, user: { email, password } }));
export const logout = bindActionCreators(() => ({ type: LOGOUT }));
export const displayNotificationDrawer = bindActionCreators(() => ({ type: DISPLAY_NOTIFICATION_DRAWER }));
export const hideNotificationDrawer = bindActionCreators(() => ({ type: HIDE_NOTIFICATION_DRAWER }));
