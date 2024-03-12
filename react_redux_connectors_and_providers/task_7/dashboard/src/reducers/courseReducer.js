import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "../actions/courseActionTypes";
import { fromJS } from 'immutable';
import { coursesNormalizer } from '../schema/courses';

export const initialState = fromJS({
  result: [],
  entities: {
    courses: { },
  },
});

export default function courseReducer(state = initialState, action) {
  if (!action) return state;

  switch (action.type) {
    case SELECT_COURSE: {
      return state.setIn(['entities', 'courses', action.index.toString(), 'isSelected'], true);
    }
    case UNSELECT_COURSE: {
      return state.setIn(['entities', 'courses', action.index.toString(), 'isSelected'], false);
    }
    case FETCH_COURSE_SUCCESS: {
      const mapped = action.data.map(course => ({ ...course, isSelected: false }));
      const normalized = coursesNormalizer(mapped);
      const immutableNormalized = fromJS(normalized);
      const mergedState = state.merge(immutableNormalized);

      // console.log(mapped, normalized, immutableNormalized, mergedState);

      return mergedState;
    }
    default: {
      return state;
    }
  }
}
