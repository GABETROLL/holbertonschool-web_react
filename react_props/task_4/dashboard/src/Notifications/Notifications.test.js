import React from 'react';
import { shallow } from 'enzyme';
import { Notifications, menuItemElement, notificationsDrawer } from './Notifications';
import NotificationItem from './NotificationItem';

describe('<Notifications />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Notifications />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('when displayDrawer={false}', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<Notifications displayDrawer={false} />);
    });

    it('renders the div.menuItem', () => {
      expect(wrapper.contains(menuItemElement)).toBe(true);
    });

    it('does not render the div.Notifications', () => {
      expect(wrapper.contains('div.Notifications')).toHaveLength(0);
    });
  });

  describe('when displayDrawer={true}', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<Notifications displayDrawer={true} />);
    });

    it('renders the div.menuItem', () => {
      expect(wrapper.contains(menuItemElement)).toBe(true);
    });

    it('renders the div.Notifications', () => {
      expect(wrapper.contains(notificationsDrawer)).toBe(true);
    });

    it('renders 3 <NotificationItem />', () => {
      expect(wrapper.find(NotificationItem)).toHaveLength(3);
    });
  
    it('the first <NotificationItem /> has the correct HTML rendered', () => {
      expect(wrapper.find(NotificationItem).first().html())
        .toBe('<li data-notification-type="default">New course available</li>');
    });
  
    it('renders <p>Here is the list of notifications</p>', () => {
      expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(true);
    });
  });
});
