import React from 'react';
import { shallow, mount } from 'enzyme';
import Notifications from './Notifications';
import { styles as notificationsStyles } from './Notifications';
import NotificationItem from './NotificationItem';
import { styles as notificationItemStyles } from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils, css } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

// TODO: UPDATE TESTS

describe('<Notifications />', () => {
  let displayedDrawer;
  let usedWrapper;
  beforeAll(() => {
    displayedDrawer = shallow(<Notifications displayDrawer={true} />);
    usedWrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={[
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: {__html: getLatestNotification()} },
      ]} />
    );
  });

  it('renders without crashing', () => {
    for (const displayDrawer of [undefined, false, true]) {
      for (const listNotifications of [undefined, [], [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: {__html: getLatestNotification()} },
      ]]) {
        const wrapper = shallow(<Notifications displayDrawer={displayDrawer} listNotifications={listNotifications} />);
        expect(wrapper.exists()).toBe(true);
      }
    }
  });

  // DO NOT ADD TWO DESCRIBES

  it('renders the menuItem, with the correct styles (displayed) when displayDrawer={false}', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find(`div.${css(notificationsStyles.menuItem)}`)).toHaveLength(1);
  });

  it('does not render the div.Notifications when displayDrawer={false}', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('div.Notifications')).toHaveLength(0);
  });

  it('renders correctly when given no `listNotifications` array or an empty one', () => {
    const expectedHtml = `<ul class="${css(notificationsStyles.NotificationsUl)}">\
<li class="${css(notificationItemStyles.notificationItem, notificationItemStyles.defaultNotification)}"\
 data-notification-type="default">No new notifications for now</li>\
</ul>`;

    for (const wrapper of [
      shallow(<Notifications displayDrawer={true} />),
      shallow(<Notifications displayDrawer={true} listNotifications={[]} />)
    ]) {
      // console.log(wrapper.html());
      const notificationsUl = wrapper.find('ul').first();
      expect(notificationsUl.html()).toBe(expectedHtml);
    }
  });

  it('renders correctly when given a `listNotifications` array with notifications inside', () => {
    // ONLY TESTS THAT THE component renders the  LIST correctly!!
    const expectedHtml = `<ul class="${css(notificationsStyles.NotificationsUl)}">\
<li class="${css(notificationItemStyles.notificationItem, notificationItemStyles.defaultNotification)}" data-notification-type="default">New course available</li>\
<li class="${css(notificationItemStyles.notificationItem, notificationItemStyles.urgentNotification)}" data-notification-type="urgent">New resume available</li>\
<li class="${css(notificationItemStyles.notificationItem, notificationItemStyles.urgentNotification)}" data-notification-type="urgent"><strong>Urgent requirement</strong> - complete by EOD</li>\
</ul>`;
    const notificationsUl = usedWrapper.find('ul').first();
    expect(notificationsUl.html()).toBe(expectedHtml);
  });

  it(`doesn't render the message "Here is the list of notifications"\
 and renders "No new notifications for now", when listNotifications is empty`, () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    // console.log(wrapper.html());
    expect(wrapper.html().includes('Here is the list of notifications')).toBe(false);
    const notificationsUl = wrapper.find('ul').first();
    expect(notificationsUl.html().includes('No new notifications for now')).toBe(true);
  });

  it('renders the menuItem, with the correct styles (not displayed) when displayDrawer={true}', () => {
    expect(displayedDrawer.find(`div.${css(notificationsStyles.menuItem, notificationsStyles.hiddenMenuItem)}`))
      .toHaveLength(1);
  });

  it('renders the div.${notificationsStyles.NotificationsDrawerOpen} when displayDrawer={true}', () => {
    expect(displayedDrawer.find(`div.${css(notificationsStyles.NotificationsDrawerOpen)}`)).toHaveLength(1);
  });

  it('renders 3 <NotificationItem /> when displayDrawer={true}', () => {
    expect(usedWrapper.find(NotificationItem)).toHaveLength(3);
  });

  it('the first <NotificationItem /> has the correct HTML rendered when displayDrawer={true}', () => {
    expect(usedWrapper.find(NotificationItem).first().html())
      .toBe(`<li class="${css(notificationItemStyles.notificationItem, notificationItemStyles.defaultNotification)}" data-notification-type="default">New course available</li>`);
  });

  it(`renders the "Here is the list of notifications" <p /> when displayDrawer={true} \
and 'listNotifications' prop exists and is not empty`, () => {
    expect(usedWrapper.contains(<p className={css(notificationsStyles.NotificationsTitle)}>Here is the list of notifications</p>))
      .toBe(true);
    // expect(usedWrapper.contains(<p className="NotificationsTitle"></p>)).toBe(true);
  });

  it('has a method, `markAsRead(id)`, that when called, calls: console.log(`Notification ${id} has been marked as read`)', () => {
    jest.spyOn(console, 'log');

    const id = 3;
    (new Notifications(Notifications.defaultProps)).markAsRead(id);
    expect(console.log.mock.calls).toEqual([[`Notification ${id} has been marked as read`]]);

    console.log.mockRestore();
    // expect(console.log.mock).toBe(undefined);
  });

  it("doesn't re-render when its props are updated, and the `listNotifications` prop stays the same", () => {
    const testNotifications = [
      { id: 1, type: 'urgent', value: 'Hello' },
      { id: 2, type: 'default', value: 'World' },
      { id: 3, type: 'default', html: {__html: '<strong>Congratulations!</strong>'} },
    ];

    jest.spyOn(Notifications.prototype, 'render');

    const wrapper = mount(<Notifications displayDrawer={true} listNotifications={testNotifications} />);

    // creating the wrapper is should be one `render` call
    expect(Notifications.prototype.render.mock.calls).toEqual([[]]);

    // Update the props, with the SAME LIST IN MEMORY
    wrapper.setProps({ displayDrawer: true, listNotifications: testNotifications });
    wrapper.setProps({ displayDrawer: false, listNotifications: testNotifications });

    const testNotificationsCopy = [...testNotifications];

    // Update the props, again, this time, with a COPY OF THE LIST
    wrapper.setProps({ displayDrawer: true, listNotifications: testNotificationsCopy });
    wrapper.setProps({ displayDrawer: false, listNotifications: testNotificationsCopy });

    /*
    `render` method shouldn't have any more calls,
    after creating it
    */
    expect(Notifications.prototype.render.mock.calls).toEqual([[]]);

    Notifications.prototype.render.mockRestore();
  });

  it('re-renders when its props are updated, and the `listNotifications` prop is longer', () => {
    let testNotifications = [
      { id: 1, type: 'urgent', value: 'Hello' },
      { id: 2, type: 'default', value: 'World' },
      { id: 3, type: 'default', html: {__html: '<strong>Congratulations!</strong>'} },
    ];

    jest.spyOn(Notifications.prototype, 'render');
    jest.spyOn(Notifications.prototype, 'shouldComponentUpdate');

    const wrapper = mount(<Notifications displayDrawer={true} listNotifications={testNotifications} />);
    // 1 render call, to render the component initially
    expect(Notifications.prototype.render.mock.calls).toEqual([[]]);
    expect(Notifications.prototype.shouldComponentUpdate.mock.calls).toHaveLength(0);

    testNotifications = [...testNotifications, { id: 4, type: 'urgent', value: 'Testing!' }];
    wrapper.setProps({ displayDrawer: true, listNotifications: testNotifications });
    // 2 render calls, to re-render the component after a new and longer testNotifications list was passed
    expect(Notifications.prototype.render.mock.calls).toEqual([[], []]);
    expect(Notifications.prototype.shouldComponentUpdate.mock.calls).toHaveLength(1);

    testNotifications = [...testNotifications, { id: 5, type: 'default', value: '1, 2. 3...' }];
    wrapper.setProps({ displayDrawer: false, listNotifications: testNotifications });
    // 3 render calls, to re-render the component after a new and longer testNotifications list was passed
    expect(Notifications.prototype.render.mock.calls).toEqual([[], [], []]);
    expect(Notifications.prototype.shouldComponentUpdate.mock.calls).toHaveLength(2);

    Notifications.prototype.render.mockRestore();
    Notifications.prototype.shouldComponentUpdate.mockRestore();
  });
});
