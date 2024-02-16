import { bindActionCreators } from 'redux';
import store from './store';
import { MARK_AS_READ, SET_TYPE_FILTER } from './notificationActionTypes';

export const markAsAread = bindActionCreators((index) => ({ type: MARK_AS_READ, index }), store.dispatch);
export const setNotificationFilter = bindActionCreators((filter) => ({ type: SET_TYPE_FILTER, filter }), store.dispatch);
