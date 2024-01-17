import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('<CourseList />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<CourseList />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the 5 different rows', () => {
    expect(wrapper.find(CourseListRow)).toHaveLength(5);
  });
});
