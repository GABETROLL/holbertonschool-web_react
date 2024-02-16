import { bindActionCreators } from 'redux';
import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

export const selectCourse = bindActionCreators((index) => ({ type: SELECT_COURSE, index }));
export const unSelectCourse = bindActionCreators((index) => ({ type: UNSELECT_COURSE, index }));
