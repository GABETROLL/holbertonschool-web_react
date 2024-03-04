import React from 'react';
import { shallow } from 'enzyme';
import { StatelessHeader as Header } from './Header';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('<Header />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an <img /> and an <h1 />', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it("doesn't render the `#logoutSection` when the `user` prop says the user is not logged in (regardless of credentials)", () => {
    let wrapper = shallow(<Header user={{ email: 'test@email.pr', password: 'notsosecurepass', isLoggedIn: false }} />);
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
    wrapper = shallow(<Header user={{ email: '', password: '', isLoggedIn: false }} />);
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });
  it("renders the `#logoutSection`, when the `user` prop says the user is logged in", () => {
    const wrapper = shallow(<Header user={{ email: 'test@email.pr', password: 'notsosecurepass', isLoggedIn: true }} />);
    // console.log(wrapper.html());
    expect(wrapper.find('#logoutSection')).toHaveLength(1);
  });
  // `logout` test was here!
});
