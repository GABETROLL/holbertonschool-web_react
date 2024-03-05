import React from 'react';
import { shallow } from 'enzyme';
import { StatelessFooter as Footer } from './Footer';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('when the user is not logged in, (in the `user` prop), at the very least renders the text "Copyright"', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.html().includes('Copyright'));
  });

  it(`doesn't render the "Contact Us" link, when the \`user\` prop says the user is not logged in \
(regardless of credentials)`, () => {
    let wrapper = shallow(<Footer />);
    expect(wrapper.contains(<a>Contact us</a>)).toBe(false);
    wrapper = shallow(<Footer user={{ email: 'an email', password: 'a password', isLoggedIn: false }} />);
    expect(wrapper.contains(<a>Contact us</a>)).toBe(false);
  });
  it('renders the "Contact Us" link, when the \`user\` prop says the user is logged in', () => {
    const wrapper = shallow(<Footer user={{ email: 'an email', password: 'a password', isLoggedIn: true}} />);
    expect(wrapper.contains(<a>Contact us</a>)).toBe(true);
  });
});
