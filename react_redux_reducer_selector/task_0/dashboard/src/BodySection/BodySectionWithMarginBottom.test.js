import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('<BodySectionWithMarginBottom />', () => {
  it("correctly renders a BodySection component with the same props it's given", () => {
    for (const props of [{ title: 'Hi!'}, { title: 'Hello, World!', children: [(<p>Test paragraph</p>)]}]) {
      const wrapper = shallow(<BodySectionWithMarginBottom {...props} />);
      expect(wrapper.contains(<BodySection {...props} />)).toBe(true);
    }
  });
});
