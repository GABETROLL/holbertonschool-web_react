import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "../actions/courseActionTypes";
import { selectCourse, unSelectCourse, fetchCourseSuccess } from "../actions/courseActionCreators";
import courseReducer, { initialState } from "./courseReducer";

const fetched = [
  {
    id: 1,
    name: "ES6",
    credit: 60
  },
  {
    id: 2,
    name: "Webpack",
    credit: 20
  },
  {
    id: 3,
    name: "React",
    credit: 40
  }
];
const secondSelected = [
  {
    id: 1,
    name: "ES6",
    isSelected: false,
    credit: 60
  },
  {
    id: 2,
    name: "Webpack",
    isSelected: true,
    credit: 20
  },
  {
    id: 3,
    name: "React",
    isSelected: false,
    credit: 40
  }
];
const secondUnselected = [
  {
    id: 1,
    name: "ES6",
    isSelected: false,
    credit: 60
  },
  {
    id: 2,
    name: "Webpack",
    isSelected: false,
    credit: 20
  },
  {
    id: 3,
    name: "React",
    isSelected: false,
    credit: 40
  }
];

describe('courseReducer', () => {
  it('returns an empty array, when given the default `state` argument (given undefined)', () => {
    expect(courseReducer()).toStrictEqual([]);
    expect(courseReducer(undefined, selectCourse(3))).toStrictEqual([]);
    expect(courseReducer(undefined, unSelectCourse(1))).toStrictEqual([]);
    expect(courseReducer(undefined, fetchCourseSuccess([]))).toStrictEqual([]);
    expect(courseReducer(undefined, fetchCourseSuccess(fetched))).toStrictEqual([]); // should fail
    expect(courseReducer(undefined, { type: 'other' })).toStrictEqual([]);
  });

  it('returns the courses array passed, and each course now has the property isSelected=false,\
when the action type is `FETCH_COURSE_SUCCESS`', () => {
    expect(courseReducer(initialState, fetchCourseSuccess(fetched))).toStrictEqual(secondUnselected);
  });

  it('returns the courses array passed, with the 2nd course selected,\
when the action type is `SELECT_COURSE` and the index is 2', () => {
    expect(courseReducer(secondUnselected, selectCourse(2))).toStrictEqual(secondSelected);
  });

  it('returns the courses array passed, with the 2nd course un-selected,\
when the action type is `UNSELECT_COURSE` and the index is 2', () => {
    expect(courseReducer(secondSelected, unSelectCourse(2))).toStrictEqual(secondUnselected);
  });
});
