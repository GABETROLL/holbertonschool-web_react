import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';

// new
describe('<App />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('contains one Notifications component', () => {
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });
  it('contains one Header component', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
  it('contains one Login component', () => {
    expect(wrapper.find(Login)).toHaveLength(1);
  });
  it('contains one Footer component', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('CourseList is not rendered', () => {
    expect(wrapper.find(CourseList)).toHaveLength(0);
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
