import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('<Notifications />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Notifications />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
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
