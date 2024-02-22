import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "../actions/courseActionTypes";

export const initialState = [];

export default function courseReducer(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case SELECT_COURSE: {
      return state.map(course => ({ ...course, isSelected: course.id === action.index ? true : course.isSelected }));
    }
    case UNSELECT_COURSE: {
      return state.map(course => ({ ...course, isSelected: course.id === action.index ? false : course.isSelected }));
    }
    case FETCH_COURSE_SUCCESS: {
      return action.data.map(course => ({ ...course, isSelected: false }));
    }
    default: {
      return state;
    }
  }
}
