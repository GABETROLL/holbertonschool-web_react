import { Map } from 'immutable';

/**
 * Assumes that `coursesState` comes from `courseReducer`.
 *
 * Returns the `Immutable.Map` course values in `coursesState.getIn(['entities', 'courses'])`
 * as an `Immutable.List<POJS Course>`.
 */
export default function getListCourses(coursesState) {
  return (coursesState.getIn(['entities', 'courses']) || Map())
    .valueSeq()
    .map(course => course.toJS())
    .toList();
}
