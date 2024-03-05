import { combineReducers } from 'redux';
import { notificationReducer } from './notificationReducer';
import { courseReducer } from './courseReducer';
import { uiReducer } from './uiReducer';

const rootReducer = combineReducers({ ui: uiReducer, notifications: notificationReducer, courses: courseReducer });
export default rootReducer;
