import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

// new
describe('<CourseListRow />', () => {
  describe('when isHeader=true', () => {
    it('renders one <th /> cell with colspan="2" when textSecondCell does not exist', () => {
      const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="a" />);
      expect(wrapper.find('th')).toHaveLength(1);
      expect(wrapper.find('th').first().prop('colSpan')).toBe('2');
    });

    it('renders two <th /> cells when textSecondCell is present', () => {
      const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="b" textSecondCell="c" />);
      expect(wrapper.find('th')).toHaveLength(2);
    });
  });

  describe('when isHeader=false', () => {
    it('renders correctly two <td /> elements within a <tr /> element', () => {
      const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="d" textSecondCell="e" />);
      expect(wrapper.type()).toBe('tr');
      expect(wrapper.find('td')).toHaveLength(2);
    });
  });
});
