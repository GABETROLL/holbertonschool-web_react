import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

export function selectCourse(index) {
  return { type: SELECT_COURSE, index };
}
export function unSelectCourse(index) {
  return { type: UNSELECT_COURSE, index };
}
export function fetchCourseSuccess(data) {
  return { type: FETCH_COURSE_SUCCESS, data };
}

export function boundSelectCourse(index) {
  return dispatch(selectCourse(index));
}
export function boundUnSelectCourse(index) {
  return dispatch(unSelectCourse(index));
}
export function boundFetchCourseSuccess(data) {
  return dispatch(fetchCourseSuccess(data));
}
