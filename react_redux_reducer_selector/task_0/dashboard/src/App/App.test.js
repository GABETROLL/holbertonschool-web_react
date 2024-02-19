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
  });
  beforeEach(() => {
    mountWrapper = mount(<App />);
  });

  it('renders without crashing', () => {
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('contains one Notifications component', () => {
    expect(shallowWrapper.find(Notifications)).toHaveLength(1);
  });
  it('has a `displayDrawer` state, and its initial value is false', () => {
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
  it('has an instance method, called `markNotificationAsRead(id)`, that replaces its `listNotifications` state\
 with a new `listNotifications` without the notification(s) with the `id`', () => {
    const mockListNotifications = [
      { id: 1, type: 'urgent', value: 'Urgent notification!' },
      { id: 2, type: 'default', value: 'Default notification!' },
      { id: 10, type: 'urgent', html: { __html: '<strong>Urgent!</strong>'} },
      { id: 11, type: 'default', html: { __html: '<strong>Default!</strong>'} },
    ];
    mountWrapper.setState({ listNotifications: mockListNotifications });
    // Both the mock and the set state start off as the same object in memory.
    expect(Object.is(mountWrapper.state().listNotifications, mockListNotifications)).toBe(true);

    mountWrapper.instance().markNotificationAsRead(11);
    mockListNotifications.pop();
    expect(mountWrapper.state().listNotifications).toStrictEqual(mockListNotifications);
    /*
      The `listNotifications` object inside the state should have been REPLACED
      BY A NEW ONE, that excludes the notification with the ID we just removed from the mock
      (and that's specified in the number ^).
    */
    expect(Object.is(mountWrapper.state().listNotifications, mockListNotifications)).toBe(false);

    mountWrapper.instance().markNotificationAsRead(10);
    mockListNotifications.pop();
    expect(mountWrapper.state().listNotifications).toStrictEqual(mockListNotifications);

    mountWrapper.instance().markNotificationAsRead(2);
    mockListNotifications.pop();
    expect(mountWrapper.state().listNotifications).toStrictEqual(mockListNotifications);

    mountWrapper.instance().markNotificationAsRead(1);
    mockListNotifications.pop();
    expect(mountWrapper.state().listNotifications).toStrictEqual(mockListNotifications);
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

  it('logs out user (resets the user credentials state) when Ctrl+h is pressed', () => {
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
          isLoggedIn: true,
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

  it("has an instance method, `logIn`, that updates the state correctly:\
 sets the credentials and `isLoggedIn` to true in the state's `value.user`,\
 and leaves the rest of the state the same", () => {
    // setup
    const oldState = mountWrapper.state();
    expect(mountWrapper.state()).toStrictEqual({ ...(oldState), value: { ...(oldState.value), user: defaultUser } });

    // call
    mountWrapper.instance().logIn('a', 'b');

    // test
    const expectedNewUser = { email: 'a', password: 'b', isLoggedIn: true };
    expect(mountWrapper.state()).toStrictEqual({ ...(oldState), value: { ...(oldState.value), user: expectedNewUser } });
  });
  it("has an instance method, `logOut`, that updates the state correctly:\
 resets the state's `value.user` to `defaultUser`, from './AppContext',\
 and leaves the rest of the state the same", () => {
    // setup
    const oldState = mountWrapper.state();
    mountWrapper.setState({ ...(oldState), value: { ...(oldState.value), user: { email: 'hello', password: 'world', isLoggedIn: true } } });
    /*
    Use `setState` directly, instead of `logIn`, to only test `logOut` in isloation,
    and not depend on `logIn`!
    */

    // call
    mountWrapper.state().value.logOut();

    // test
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
