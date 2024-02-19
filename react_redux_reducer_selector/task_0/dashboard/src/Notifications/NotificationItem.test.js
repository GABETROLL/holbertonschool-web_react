import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('<NotificationItem />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotificationItem />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct HTML based on the `type` and `value` props', () => {
    for (const typeProp of ['default', 'urgent', '???']) {
      for (const valueProp of ['test', '???']) {
        const wrapper = shallow(<NotificationItem type={typeProp} value={valueProp} />);
        expect(wrapper.type()).toBe('li');
        expect(wrapper.prop('data-notification-type')).toBe(typeProp);
        expect(wrapper.text()).toBe(valueProp);
        // expect(wrapper.html()).toBe(`<li data-notification-type="${typeProp}">${valueProp}</li>`);
      }
    }
  });

  it('renders correct HTML based on the `html` prop', () => {
    let wrapper;

    wrapper = shallow(<NotificationItem html={{__html: "<strong>urgent</strong>"}} />);
    expect(wrapper.type()).toBe('li');
    expect(wrapper.prop('data-notification-type')).toBe('default');
    expect(wrapper.render().html()).toBe('<strong>urgent</strong>');
    // expect(wrapper.html()).toBe('<li data-notification-type="default"><strong>urgent</strong></li>');

    wrapper = shallow(<NotificationItem value="a" html={{__html: "b"}} />);
    expect(wrapper.type()).toBe('li');
    expect(wrapper.prop('data-notification-type')).toBe('default');
    expect(wrapper.render().html()).toBe('b');
    // expect(wrapper.html()).toBe('<li data-notification-type="default">b</li>');

    wrapper = shallow(<NotificationItem html={{__html: "???"}} />);
    expect(wrapper.type()).toBe('li');
    expect(wrapper.prop('data-notification-type')).toBe('default');
    expect(wrapper.render().html()).toBe('???');
    // expect(wrapper.html()).toBe('<li data-notification-type="default">???</li>');

    wrapper = shallow(<NotificationItem />);
    expect(wrapper.type()).toBe('li');
    expect(wrapper.prop('data-notification-type')).toBe('default');
    expect(wrapper.render().html()).toBe('');
    // expect(wrapper.html()).toBe('<li data-notification-type="default"></li>');
  });

  it('calls its `markAsRead` prop when clicked', () => {
    const markAsReadSpy = jest.fn();
    const id = 5;
    const wrapper = shallow(<NotificationItem id={id} markAsRead={markAsReadSpy} />);
    wrapper.simulate('click');
    expect(markAsReadSpy.mock.calls).toEqual([[id]]);
  });
});
