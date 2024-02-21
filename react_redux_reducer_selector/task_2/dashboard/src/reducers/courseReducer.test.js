import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "../actions/courseActionTypes";
import courseReducer, { initialState } from "./courseReducer";

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
  it('returns an empty array, when given the default arguments (given undefined)', () => {
    expect(courseReducer()).toStrictEqual([]);
  });

  it('returns the courses array passed, and each course now has the property isSelected=false,\
when the action type is `FETCH_COURSE_SUCCESS`', () => {
    expect(courseReducer(initialState, { type: FETCH_COURSE_SUCCESS, data: [
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
    ]})).toStrictEqual(secondUnselected);
  });

  it('returns the courses array passed, with the index-th course selected,\
when the action type is `SELECT_COURSE`', () => {
    expect(courseReducer(
      secondUnselected,
      { type: SELECT_COURSE, index: 2 }
    )).toStrictEqual(secondSelected);
  });

  it('returns the courses array passed, with the index-th course un-selected,\
when the action type is `UNSELECT_COURSE`', () => {
    expect(courseReducer(
      secondSelected,
      { type: SELECT_COURSE, index: 2 }
    )).toStrictEqual(secondUnselected);
  });
});
