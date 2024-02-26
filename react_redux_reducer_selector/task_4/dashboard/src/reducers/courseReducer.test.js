import { selectCourse, unSelectCourse, fetchCourseSuccess } from "../actions/courseActionCreators";
import { Map, fromJS } from 'immutable';
import courseReducer, { initialState } from "./courseReducer";

const fetched = [
  {
    id: 1,
    name: "ES6",
    credit: 60,
  },
  {
    id: 2,
    name: "Webpack",
    credit: 20,
  },
  {
    id: 3,
    name: "React",
    credit: 40,
  },
];
const secondUnselected = {
  '1': {
    credit: 60,
    id: 1,
    isSelected: false,
    name: "ES6",
  },
  '2': {
    credit: 20,
    id: 2,
    isSelected: false,
    name: "Webpack",
  },
  '3': {
    credit: 40,
    id: 3,
    isSelected: false,
    name: "React",
  },
};
const secondSelected = {
  '1': {
    credit: 60,
    id: 1,
    isSelected: false,
    name: "ES6",
  },
  '2': {
    credit: 20,
    id: 2,
    isSelected: true,
    name: "Webpack",
  },
  '3': {
    credit: 40,
    id: 3,
    isSelected: false,
    name: "React",
  },
};
const fetchedData = {
  result: [1, 2, 3],
  entities: {
    courses: secondUnselected,
  },
};

describe('courseReducer',() => {
  it('returns an empty Map, when given the default `state` argument (given undefined)', () => {
    expect(courseReducer()).toStrictEqual(Map());
    expect(courseReducer(undefined, { })).toStrictEqual(Map());
    expect(courseReducer(undefined, { type: 'other' })).toStrictEqual(Map());
  });

  it('returns the courses array passed, and each course now has the property isSelected=false, \
when the action type is `FETCH_COURSE_SUCCESS`', () => {
    const value = courseReducer(initialState, fetchCourseSuccess(fetched));
    expect(value.toJS()).toStrictEqual(fetchedData);
  });

  it('returns the courses array passed, with the 2nd course selected, \
when the action type is `SELECT_COURSE` and the index is 2', () => {
    const secondUnselectedState = fromJS(fetchedData);
    expect(
      courseReducer(secondUnselectedState, selectCourse(2))
        .getIn(['entities', 'courses'])
        .toJS(),
    ).toStrictEqual(secondSelected);
  });

  it('returns the courses array passed, with the 2nd course un-selected, \
when the action type is `UNSELECT_COURSE` and the index is 2', () => {
    const secondSelectedState = fromJS({ ...fetchedData, entities: { courses: secondSelected } });
    expect(
      courseReducer(secondSelectedState, unSelectCourse(2))
        .getIn(['entities', 'courses'])
        .toJS(),
    ).toStrictEqual(secondUnselected);
  });
});
