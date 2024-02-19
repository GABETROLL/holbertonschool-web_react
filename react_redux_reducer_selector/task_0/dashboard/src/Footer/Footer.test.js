import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from './Footer';
import AppContext from '../App/AppContext';
import { logOut } from '../App/AppContext';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('(when the user is not logged in, in the AppContext), at the very least renders the text "Copyright"', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.html().includes('Copyright'));
  });

  it(`doesn't render the "Contact Us" link when the user is not logged in`, () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: { email: '', password: '', isLoggedIn: false }, logOut }}>
        <Footer />
      </AppContext.Provider>
    );
    const foundFooters = wrapper.find(Footer);
    expect(foundFooters).toHaveLength(1);
    const footer = foundFooters.first();
    expect(footer.contains(<a>Contact us</a>)).toBe(false);
  });
  it('renders the "Contact Us" link when the user is logged in', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: { email: 'hello', password: 'world', isLoggedIn: true }, logOut }}>
        <Footer />
      </AppContext.Provider>
    );
    const foundFooters = wrapper.find(Footer);
    expect(foundFooters).toHaveLength(1);
    const footer = foundFooters.first();
    expect(footer.contains(<a>Contact us</a>)).toBe(true);
  });
});
