import React from 'react';
import { shallow, mount } from 'enzyme';
import { StatelessCourseList as CourseList } from './CourseList';
import { List } from 'immutable';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

const usedListCourses = List([
  { id: '1', name: 'ES6', credit: 60 },
  { id: '2', name: 'Webpack', credit: 20 },
  { id: '3', name: 'React', credit: 40 },
]);

// TODO: UPDATE TESTS
describe('<CourseList />', () => {
  let defaultWrapper;
  let emptyListWrapper;
  let usedWrapper;
  beforeAll(() => {
    defaultWrapper = shallow(<CourseList />);
    emptyListWrapper = shallow(<CourseList listCourses={List([])} />);
    usedWrapper = shallow(<CourseList listCourses={usedListCourses} />);
  });

  it('renders without crashing', () => {
    expect(defaultWrapper.exists()).toBe(true);
    expect(emptyListWrapper.exists()).toBe(true);
    expect(usedWrapper.exists()).toBe(true);
  });

  it('renders correctly when given an empty `listCourses` or none at all', () => {
    for (const wrapper of [defaultWrapper, emptyListWrapper]) {
      expect(wrapper.find('tbody')).toHaveLength(1);
      const tBody = wrapper.find('tbody').first();

      expect(tBody.children()).toHaveLength(1);
      expect(tBody.contains(<CourseListRow textFirstCell="No course available yet" />)).toBe(true);
    }
  });

  it("renders correctly when it's given a correct `listCourses` that's not empty", () => {
    expect(usedWrapper.find('tbody')).toHaveLength(1);
    const tBody = usedWrapper.find('tbody').first();

    expect(tBody.children()).toHaveLength(3);
    expect(tBody.contains(<CourseListRow textFirstCell="ES6" textSecondCell={60} />)).toBe(true);
    expect(tBody.contains(<CourseListRow textFirstCell="Webpack" textSecondCell={20} />)).toBe(true);
    expect(tBody.contains(<CourseListRow textFirstCell="React" textSecondCell={40} />)).toBe(true);
  });

  it('renders the 5 different rows', () => {
    expect(usedWrapper.find(CourseListRow)).toHaveLength(5);
  });

  it('dispatches the `fetchCourses` bound thunk action prop when mounted, with no arguments', () => {
    const spyFetchCourses = jest.fn();
    mount(<CourseList fetchCourses={spyFetchCourses} />);
    expect(spyFetchCourses.mock.calls).toStrictEqual([[]]);
  });

  it('has a method, named `onChangeRow`, that calls `selectCourse(id)` when given `id, checked: true` as arguments, \
and calls `unSelectCourse(id)` when given `id, checked: false` as arguments', () => {
    const spySelectCourse = jest.fn();
    const spyUnSelectCourse = jest.fn();
    const wrapper = mount(<CourseList selectCourse={spySelectCourse} unSelectCourse={spyUnSelectCourse} />);

    expect(spySelectCourse.mock.calls).toStrictEqual([]);
    expect(spyUnSelectCourse.mock.calls).toStrictEqual([]);
    const id = '3094380594380594385';
    wrapper.instance().onChangeRow(id, false);
    expect(spySelectCourse.mock.calls).toStrictEqual([]);
    expect(spyUnSelectCourse.mock.calls).toStrictEqual([[id]]);
    wrapper.instance().onChangeRow(id, true);
    expect(spySelectCourse.mock.calls).toStrictEqual([[id]]);
    expect(spyUnSelectCourse.mock.calls).toStrictEqual([[id]]);
  });
});
