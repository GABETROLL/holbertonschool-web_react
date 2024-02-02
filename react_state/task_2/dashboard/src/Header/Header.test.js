import React from 'react';
import { mount } from 'enzyme';
import { defaultUser, logOut } from '../App/AppContext';
import AppContext from '../App/AppContext';
import Header from './Header';
import { styles } from './Header';
import { StyleSheetTestUtils, css } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('<Header />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an <img /> and an <h1 />', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it("doesn't render the `p#logoutSection`,\
 when mounted with the AppContext having the user not logged in, and empty credentials", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('p#logoutSection')).toHaveLength(0);
  });
  it("renders the `p#logoutSection`,\
 when mounted with the AppContext having the user logged in with their credentials", () => {
    const wrapper = mount(
      <AppContext.Provider value={{
        user: {
          email: 'test@test.test',
          password: 'supersecurepass',
          isLoggedIn: true,
        },
        logOut,
      }}>
        <Header />
      </AppContext.Provider>
    );
    // console.log(wrapper.html());
    expect(wrapper.find('p#logoutSection')).toHaveLength(1);
  });
  it('has an `a.${styles.link}` inside the `p#logoutSection` (when the AppContext has the user is logged in),\
which calls the `logOut` function from the context', () => {
    const spyLogOut = jest.fn();

    const wrapper = mount(
      <AppContext.Provider value={{
        user: {
          email: 'test@test.test',
          password: 'supersecurepass',
          isLoggedIn: true,
        },
        logOut: spyLogOut,
      }}>
        <Header />
      </AppContext.Provider>
    );

    wrapper
      .find('p#logoutSection').first()
      .find(`a.${css(styles.link)}`).first()
      .simulate('click');

    expect(spyLogOut.mock.calls).toEqual([[]]);
  });
});
