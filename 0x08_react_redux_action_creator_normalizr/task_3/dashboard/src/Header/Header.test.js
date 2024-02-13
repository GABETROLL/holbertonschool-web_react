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

  it("doesn't render the `#logoutSection`,\
 when mounted with the AppContext having the user not logged in, and empty credentials", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });
  it("renders the `#logoutSection`,\
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
    expect(wrapper.find('#logoutSection')).toHaveLength(1);
  });
  it('has an `a.${styles.link}` inside the `#logoutSection` (when the AppContext has the user is logged in),\
which calls the `logOut` function from the context', () => {
    // TODO: FIX CIRCULAR JSON ERROR
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
      .find('#logoutSection').first()
      .find(`a.${css(styles.link)}`).first()
      .simulate('click');

    expect(spyLogOut.mock.calls).toEqual([[]]);
  });
});
