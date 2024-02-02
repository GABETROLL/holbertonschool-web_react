import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';
import AppContext from '../App/AppContext';
import { defaultUser, logOut } from '../App/AppContext';
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
    const wrapper = shallow(
      <AppContext.Provider value={{ user: { email: '', password: '', isLoggedIn: false }, logOut }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.contains(<a>Contact Us</a>)).toBe(false);
  });
  it('renders the "Contact Us" link when the user is logged in', () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ user: { email: 'hello', password: 'world', isLoggedIn: true }, logOut }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.contains(<a>Contact Us</a>)).toBe(true);
  });
});
