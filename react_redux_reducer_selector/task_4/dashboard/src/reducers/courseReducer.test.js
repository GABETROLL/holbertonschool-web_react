import { selectCourse, unSelectCourse, fetchCourseSuccess } from '../actions/courseActionCreators';
import courseReducer, { initialState } from './courseReducer';
import { Map, fromJS } from 'immutable';

const fetched = [
  {
    id: 1,
    name: 'ES6',
    credit: 60,
  },
  {
    id: 2,
    name: 'Webpack',
    credit: 20,
  },
  {
    id: 3,
    name: 'React',
    credit: 40,
  },
];
const secondUnselected = Map({
  entities: {
    courses: {
      '1': {
        credit: 60,
        id: 1,
        isSelected: false,
        name: 'ES6',
      },
      '2': {
        credit: 20,
        id: 2,
        isSelected: false,
        name: 'Webpack',
      },
      '3': {
        credit: 40,
        id: 3,
        isSelected: false,
        name: 'React',
      },
    },
  },
  result: [1, 2, 3],
});
const secondSelected = Map({
  entities: {
    courses: {
      '1': {
        credit: 60,
        id: 1,
        isSelected: false,
        name: 'ES6',
      },
      '2': {
        credit: 20,
        id: 2,
        isSelected: true,
        name: 'Webpack',
      },
      '3': {
        credit: 40,
        id: 3,
        isSelected: false,
        name: 'React',
      },
    },
  },
  result: [1, 2, 3],
});

describe('courseReducer', () => {
  it('returns an empty array, when given the default `state` argument (given undefined)', () => {
    expect(courseReducer()).toStrictEqual(Map());
    expect(courseReducer(undefined, { })).toStrictEqual(Map());
    expect(courseReducer(undefined, { type: 'other' })).toStrictEqual(Map());
  });

  it('returns the courses array passed, and each course now has the property isSelected=false,\
when the action type is `FETCH_COURSE_SUCCESS`', () => {
    expect(fromJS(
      courseReducer(initialState, fetchCourseSuccess(fetched)),
    )).toStrictEqual(secondUnselected);
  });

  it('returns the courses array passed, with the 2nd course selected,\
when the action type is `SELECT_COURSE` and the index is 2', () => {
    expect(fromJS(
      courseReducer(secondUnselected, selectCourse(2)),
    )).toStrictEqual(secondSelected);
  });

  it('returns the courses array passed, with the 2nd course un-selected,\
when the action type is `UNSELECT_COURSE` and the index is 2', () => {
    expect(fromJS(
      courseReducer(secondSelected, unSelectCourse(2)),
    )).toStrictEqual(secondUnselected);
  });
});
