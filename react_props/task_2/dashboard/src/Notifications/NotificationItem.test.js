import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('<NotificationItem />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotificationItem />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct HTML based on the `type` and `value` props', () => {
    let wrapper;

    wrapper = shallow(<NotificationItem type="default" />);
    expect(wrapper.prop('data-notification-type')).toBe('default');

    wrapper = shallow(<NotificationItem type="urgent" />);
    expect(wrapper.prop('data-notification-type')).toBe('urgent');

    wrapper = shallow(<NotificationItem type="???" />);
    expect(wrapper.prop('data-notification-type')).toBe('???');

    wrapper = shallow(<NotificationItem />);
    expect(wrapper.prop('data-notification-type')).toBe('default');

    wrapper = shallow(<NotificationItem value="hello" />);
    expect(wrapper.text()).toBe('hello');

    wrapper = shallow(<NotificationItem value="???" />);
    expect(wrapper.text()).toBe('???');

    wrapper = shallow(<NotificationItem />);
    expect(wrapper.text()).toBe('');
  });

  it('renders correct HTML based on the `html` prop', () => {
    let wrapper;

    wrapper = shallow(<NotificationItem html="<strong>urgent</strong>" />);
    expect(wrapper.html()).toBe('<li data-notification-type="default"><strong>urgent</strong></li>');

    wrapper = shallow(<NotificationItem value="a" html="b" />);
    expect(wrapper.html()).toBe('<li data-notification-type="default">b</li>');

    wrapper = shallow(<NotificationItem html="???" />);
    expect(wrapper.html()).toBe('<li data-notification-type="default">???</li>');

    wrapper = shallow(<NotificationItem />);
    expect(wrapper.html()).toBe('<li data-notification-type="default"></li>');
  });
});
