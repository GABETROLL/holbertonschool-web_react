import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
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
    expect(mountWrapper.state('displayDrawer')).toBe(false);
  });
  it("has a method, called `handleDisplayDrawer`, that changes the component's `displayDrawer` state to true", () => {
    const instance = mountWrapper.instance();
    instance.handleDisplayDrawer();
    expect(instance.state.displayDrawer).toBe(true);
  });
  it("has a method, called `handleHideDrawer`, that changes the component's `displayDrawer` state to false", () => {
    const instance = mountWrapper.instance();
    instance.handleHideDrawer();
    expect(instance.state.displayDrawer).toBe(false);
  });

  it('contains one Notifications component', () => {
    expect(shallowWrapper.find(Notifications)).toHaveLength(1);
  });
  it('contains one Header component', () => {
    expect(shallowWrapper.find(Header)).toHaveLength(1);
  });
  it('contains one Login component', () => {
    // console.log(wrapper.html());
    expect(shallowWrapper.find(Login)).toHaveLength(1);
  });
  it('contains one Footer component', () => {
    expect(shallowWrapper.find(Footer)).toHaveLength(1);
  });

  it('CourseList is not rendered', () => {
    expect(shallowWrapper.find(CourseList)).toHaveLength(0);
  });

  it('Calls `logOut` function prop when Ctrl+h is pressed', () => {
    const logOutSpy = jest.fn();
    const alertSpy = jest.fn(alert);

    const wrapper = mount(<App logOut={logOutSpy} />);
    wrapper.simulate('keydown');

    expect(alertSpy.mock.calls).toBe([['Logging you out']]);
    /*
    TODO
    (and make ruse to restore
    the `alert` function
    after mocking it)
    */
  });

  describe('when isLoggedIn={true}', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<App isLoggedIn={true} />);
    });

    it('does not render the Login component', () => {
      expect(wrapper.find(Login)).toHaveLength(0);
    });

    it('renders the CourseList component', () => {
      expect(wrapper.find(CourseList)).toHaveLength(1);
    });
  });
});
