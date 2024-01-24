import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

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
    const expectedHtml = (
      `<table id="CourseList">\
<thead><tr style="background-color:#deb5b545"><th colSpan="2">Available courses</th></tr><tr style="background-color:#deb5b545"><th>Course name</th><th>Credit</th></tr></thead>\
<tbody><tr style="background-color:#f5f5f5ab"><td>No course available yet</td><td></td></tr></tbody>\
</table>`
    );
    expect(defaultWrapper.html()).toBe(expectedHtml);
    expect(emptyListWrapper.html()).toBe(expectedHtml);
  });

  it("renders correctly when it's given a correct `listCourses` that's not empty", () => {
    const expectedHtml = (
      `<table id="CourseList">\
<thead><tr style="background-color:#deb5b545"><th colSpan="2">Available courses</th></tr><tr style="background-color:#deb5b545"><th>Course name</th><th>Credit</th></tr></thead>\
<tbody><tr style="background-color:#f5f5f5ab"><td>ES6</td><td>60</td></tr><tr style="background-color:#f5f5f5ab"><td>Webpack</td><td>20</td></tr><tr style="background-color:#f5f5f5ab"><td>React</td><td>40</td></tr></tbody>\
</table>`
    );
    expect(usedWrapper.html()).toBe(expectedHtml);
  });

  it('renders the 5 different rows', () => {
    expect(usedWrapper.find(CourseListRow)).toHaveLength(5);
  });
});
