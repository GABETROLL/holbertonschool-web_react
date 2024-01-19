import React from 'react';
import { shallow } from 'enzyme';
import { menuItemElement, notificationsDrawer } from './Notifications';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

// TODO: UPDATE TESTS

describe('<Notifications />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Notifications displayDrawer={true} />);
  });

  it('renders without crashing', () => {
    let wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
    wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.exists()).toBe(true);
    wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.exists()).toBe(true);
  });

  // DO NOT ADD TWO DESCRIBES

  it('renders the div.menuItem when displayDrawer={false}', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.contains(menuItemElement)).toBe(true);
  });

  it('does not render the div.Notifications when displayDrawer={false}', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.contains(notificationsDrawer)).toBe(false);
  });

  it('renders the div.menuItem when displayDrawer={true}', () => {
    expect(wrapper.contains(menuItemElement)).toBe(true);
  });

  it('renders the div.Notifications when displayDrawer={true}', () => {
    expect(wrapper.contains(notificationsDrawer)).toBe(true);
  });

  it('renders 3 <NotificationItem /> when displayDrawer={true}', () => {
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
  });

  it('the first <NotificationItem /> has the correct HTML rendered when displayDrawer={true}', () => {
    expect(wrapper.find(NotificationItem).first().html())
      .toBe('<li data-notification-type="default">New course available</li>');
  });

  it('renders <p className="NotificationsTitle">Here is the list of notifications</p> when displayDrawer={true}', () => {
    expect(wrapper.contains(<p className="NotificationsTitle">Here is the list of notifications</p>)).toBe(true);
  });
});
