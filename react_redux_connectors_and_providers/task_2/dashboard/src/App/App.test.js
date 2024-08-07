import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { StatelessApp as App, mapStateToProps } from './App';
import { fromJS } from 'immutable'; // for testing the mapStateToProps, with inputs from ``uiReducer``.
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
  beforeAll(() => {
    shallowWrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('contains one Notifications component', () => {
    expect(shallowWrapper.find(Notifications)).toHaveLength(1);
  });
  it('has an instance method, called `markNotificationAsRead(id)`, that replaces its `listNotifications` state\
 with a new `listNotifications` without the notification(s) with the `id`', () => {
    const mockListNotifications = [
      { id: 1, type: 'urgent', value: 'Urgent notification!' },
      { id: 2, type: 'default', value: 'Default notification!' },
      { id: 10, type: 'urgent', html: { __html: '<strong>Urgent!</strong>'} },
      { id: 11, type: 'default', html: { __html: '<strong>Default!</strong>'} },
    ];
    shallowWrapper.setState({ listNotifications: mockListNotifications });
    // Both the mock and the set state start off as the same object in memory.
    expect(shallowWrapper.state().listNotifications).toBe(mockListNotifications);

    shallowWrapper.instance().markNotificationAsRead(11);
    mockListNotifications.pop();
    expect(shallowWrapper.state().listNotifications).toStrictEqual(mockListNotifications);
    /*
      The `listNotifications` object inside the state should have been REPLACED
      BY A NEW ONE, that excludes the notification with the ID specified above,
      that we also, just removed from the mock.
    */
    expect(shallowWrapper.state().listNotifications).not.toBe(mockListNotifications);

    shallowWrapper.instance().markNotificationAsRead(10);
    mockListNotifications.pop();
    expect(shallowWrapper.state().listNotifications).toStrictEqual(mockListNotifications);

    shallowWrapper.instance().markNotificationAsRead(2);
    mockListNotifications.pop();
    expect(shallowWrapper.state().listNotifications).toStrictEqual(mockListNotifications);

    shallowWrapper.instance().markNotificationAsRead(1);
    mockListNotifications.pop();
    expect(shallowWrapper.state().listNotifications).toStrictEqual(mockListNotifications);
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

  // logout Ctrl+h was here!

  describe('when user is logged in', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(< App isLoggedIn={true} user={{ email: 'test@test.test', password: 'lkdsfj;alkdsjfskdjf;lkj' }} />);
    });

    it('does not render the LoginWithLogging component, nor the Login component \
(checking both shallowly, directly under the `shallowWrapper`)', () => {
      expect(wrapper.find(LoginWithLogging)).toHaveLength(0);
      expect(wrapper.find(Login)).toHaveLength(0);
    });

    it('renders the CourseList component', () => {
      expect(wrapper.find(CourseList)).toHaveLength(1);
    });
  });
});

describe('mapStateToProps', () => {
  it("returns { displayDrawer: false, isLoggedIn: true, user: { email: '', password: '' } } when given fromJS({ isNotificationDrawerVisible: false, isUserLoggedIn: true }). \
The argument should be a state object returned by ``uiReducer``.", () => {
    expect(mapStateToProps(
      fromJS({ isNotificationDrawerVisible: false, isUserLoggedIn: true }),
    )).toStrictEqual({ displayDrawer: false, isLoggedIn: true, user: { email: '', password: '' } });
  });
});
