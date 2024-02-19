import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

// TODO: UPDATE TESTS
// new
describe('<CourseList />', () => {
  let defaultWrapper;
  let emptyListWrapper;
  let usedWrapper;
  beforeAll(() => {
    defaultWrapper = shallow(<CourseList />);
    emptyListWrapper = shallow(<CourseList listCourses={[]} />);
    usedWrapper = shallow(<CourseList listCourses={[
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ]} />);
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
});
