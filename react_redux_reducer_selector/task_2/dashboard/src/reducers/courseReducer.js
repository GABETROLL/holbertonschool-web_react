import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "../actions/courseActionTypes";

export const initialState = [];

export default function courseReducer(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case SELECT_COURSE: {
      const newState = state;
      newState[action.index].isSelected = true;
      return newState;
    }
    case UNSELECT_COURSE: {
      const newState = state;
      newState[action.index].isSelected = false;
      return newState;
    }
    case FETCH_COURSE_SUCCESS: {
      return action.data.map(course => ({ ...course, isSelected: false }));
    }
    default: {
      return state;
    }
  }
}
