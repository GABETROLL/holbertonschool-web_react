import { selectCourse, unSelectCourse } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

describe('selectCourse', () => {
  it('selectCourse(1) should return: { type: SELECT_COURSE, index: 1 }', () => {
    expect(selectCourse(1)).toStrictEqual({ type: SELECT_COURSE, index: 1 });
  });
});

describe('unSelectCourse', () => {
  it('unSelectCourse(1) should return: { type: UNSELECT_COURSE, index: 1 } ', () => {
    expect(unSelectCourse(1)).toStrictEqual({ type: UNSELECT_COURSE, index: 1 } );
  });
});
