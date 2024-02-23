import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "../actions/courseActionTypes";
import { Map } from 'immutable';
import { coursesNormalizer } from '../schema/courses';

export const initialState = Map();

export default function courseReducer(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case SELECT_COURSE: {
      return state.setIn(['entities', 'courses', action.index, 'isSelected'], true);
    }
    case UNSELECT_COURSE: {
      return state.setIn(['entities', 'courses', action.index, 'isSelected'], false);
    }
    case FETCH_COURSE_SUCCESS: {
      return state.merge(coursesNormalizer(action.data));
      // TODO: add `isSelected: false` on all of them
    }
    default: {
      return state;
    }
  }
}
