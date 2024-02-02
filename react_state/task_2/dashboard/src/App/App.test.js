import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';
import { defaultUser } from './AppContext';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import { LoginWithLogging } from './App';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

// new
describe('<App />', () => {
  let shallowWrapper;
  let mountWrapper;
  beforeAll(() => {
    shallowWrapper = shallow(<App />);
    mountWrapper = mount(<App />);
  });

  it('renders without crashing', () => {
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('has a `displayDrawer` state, and its initial value is false', () => {
    mountWrapper = mount(<App />);
    expect(mountWrapper.state('displayDrawer')).toBe(false);
  });
  it("has a method, called `handleDisplayDrawer`, that changes the component's `displayDrawer` state to true", () => {
    mountWrapper.instance().handleDisplayDrawer();
    expect(mountWrapper.state('displayDrawer')).toBe(true);
  });
  it("has a method, called `handleHideDrawer`, that changes the component's `displayDrawer` state to false", () => {
    mountWrapper.instance().handleHideDrawer();
    expect(mountWrapper.state('displayDrawer')).toBe(false);
  });

  it('contains one Notifications component', () => {
    expect(shallowWrapper.find(Notifications)).toHaveLength(1);
  });
  it('contains one Header component', () => {
    expect(shallowWrapper.find(Header)).toHaveLength(1);
  });
  it('contains one Login component, inside one LoginWithLogging component', () => {
    // console.log(shallowWrapper.html());
    const foundLoginWithLogging = shallowWrapper.find(LoginWithLogging);
    expect(foundLoginWithLogging).toHaveLength(1);
    const loginWithLogging = foundLoginWithLogging.first().shallow();
    expect(loginWithLogging.find(Login)).toHaveLength(1);
  });
  it('contains one Footer component', () => {
    expect(shallowWrapper.find(Footer)).toHaveLength(1);
  });

  it('CourseList is not rendered', () => {
    expect(shallowWrapper.find(CourseList)).toHaveLength(0);
  });

  it(' when Ctrl+h is pressed', () => {
    const alertSpy = jest.fn(alert); // TODO: CHANGE

    const wrapper = mount(<App />);
    const wrapperState = wrapper.state();
    wrapper.setState({
      ...wrapperState,
      value: {
        ...(wrapperState.value),
        user: {
          email: 'test@test.test',
          password: '***************',
        },
      },
    });

    wrapper.simulate('keydown'); // TODO: CHANGE

    expect(alertSpy.mock.calls).toBe([['Logging you out']]);
    expect(wrapper.state().value.user).toStrictEqual(defaultUser);
    /*
    TODO
    (and make ruse to restore
    the `alert` function
    after mocking it)
    */
  });

  it('has an instance method, `logIn`, that updates `state.value.user` correctly: adds the new email and password, and sets `isLoggedIn` to true', () => {
    mountWrapper = mount(<App />);
    const oldState = mountWrapper.state();
    expect(mountWrapper.state()).toStrictEqual({ ...(oldState), value: { ...(oldState.value), user: defaultUser } });

    mountWrapper.instance().logIn('a', 'b');

    const expectedNewUser = { email: 'a', password: 'b', isLoggedIn: true };
    expect(mountWrapper.state()).toStrictEqual({ ...(oldState), value: { ...(oldState.value), user: expectedNewUser } });
  });
  it('has an instance method, `logIn`, that updates `state.value.user` correctly: adds the new email and password, and sets `isLoggedIn` to true', () => {
    mountWrapper = mount(<App />);
    const oldState = mountWrapper.state();
    mountWrapper.setState({ ...(oldState), value: { ...(oldState.value), user: { email: 'hello', password: 'world', isLoggedIn: true } } });

    mountWrapper.state().value.logOut();

    expect(mountWrapper.state()).toStrictEqual({ ...(oldState), value: { ...(oldState.value), user: defaultUser } });
  });

  describe('when user is logged in', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<App />);
      const wrapperState = wrapper.state();
      wrapper.setState({
        ...wrapperState,
        value: {
          ...(wrapperState.value),
          user: {
            email: 'test@test.test',
            password: 'lkdsfj;alkdsjfskdjf;lkj',
            isLoggedIn: true
          },
        },
      });
    });

    it('does not render the Login component', () => {
      expect(wrapper.state('value').user).toStrictEqual({ email: 'test@test.test', password: 'lkdsfj;alkdsjfskdjf;lkj', isLoggedIn: true });
      expect(wrapper.find(Login)).toHaveLength(0);
    });

    it('renders the CourseList component', () => {
      expect(wrapper.state('value').user).toStrictEqual({ email: 'test@test.test', password: 'lkdsfj;alkdsjfskdjf;lkj', isLoggedIn: true });
      expect(wrapper.find(CourseList)).toHaveLength(1);
    });
  });
});
