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

  const selectPath = ['entities', 'courses', action.index];

  switch (action.type) {
    case SELECT_COURSE: {
      return state.hasIn(selectPath)
        ? state.setIn([...selectPath, 'isSelected'], true)
        : state;
    }
    case UNSELECT_COURSE: {
      return state.hasIn(selectPath)
        ? state.setIn([...selectPath, 'isSelected'], false)
        : state;
    }
    case FETCH_COURSE_SUCCESS: {
      const mapped = action.data.map(course => ({ ...course, isSelected: false }));
      const normalized = coursesNormalizer(mapped);
      const immutableNormalized = fromJS(normalized);
      const mergedState = state.mergeDeep(immutableNormalized);

      return mergedState;
    }
    default: {
      return state;
    }
  }
}
