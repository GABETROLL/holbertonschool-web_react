import { bindActionCreators } from 'redux';
import { MARK_AS_READ, SET_TYPE_FILTER } from './notificationActionTypes';

export const markAsAread = bindActionCreators((index) => ({ type: MARK_AS_READ, index }));
export const setNotificationFilter = bindActionCreators((filter) => ({ type: SET_TYPE_FILTER, filter }));
