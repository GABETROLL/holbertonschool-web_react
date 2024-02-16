import { bindActionCreators } from 'redux';
import store from './store';
import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

export const selectCourse = bindActionCreators((index) => ({ type: SELECT_COURSE, index }), store.dispatch);
export const unSelectCourse = bindActionCreators((index) => ({ type: UNSELECT_COURSE, index }), store.dispatch);
