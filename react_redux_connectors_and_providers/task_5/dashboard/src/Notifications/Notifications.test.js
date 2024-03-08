import React from 'react';
import { shallow, mount } from 'enzyme';
import { StatelessNotifications as Notifications, styles as notificationsStyles } from './Notifications';
import NotificationItem, { styles as notificationItemStyles } from './NotificationItem';
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

  it("doesn't re-render when its props are updated, and the `listNotifications` prop stays the same", () => {
    const testNotifications = [
      {
        "guid": "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
        "isRead": false,
        "type": "urgent",
        "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      },
      {
        "guid": "cec84b7a-7be4-4af0-b833-f1485433f66e",
        "isRead": false,
        "type": "urgent",
        "value": "ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et. ",
      },
      {
        "guid": "280913fe-38dd-4abd-8ab6-acdb4105f922",
        "isRead": false,
        "type": "urgent",
        "value": "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed",
      },
      {
        "guid": "89906f88-a02d-41ee-b214-daa0c54633e3",
        "isRead": false,
        "type": "urgent",
        "value": "Odio pellentesque diam volutpat commodo sed egestas egestas",
      },
      {
        "guid": "f8d66cca-63ec-4f19-a422-a3e1c8f05a36",
        "isRead": false,
        "type": "urgent",
        "value": "In hendrerit gravida rutrum quisque non tellus orci. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Lorem mollis aliquam ut porttitor",
      },
    ];

    jest.spyOn(Notifications.prototype, 'render');

    const wrapper = mount(<Notifications listNotifications={testNotifications} />);

    // creating the wrapper is should be one `render` call
    expect(Notifications.prototype.render.mock.calls).toEqual([[]]);

    // Update the props, with the SAME LIST IN MEMORY
    wrapper.setProps({ listNotifications: testNotifications });
    wrapper.setProps({ listNotifications: testNotifications });
    wrapper.setProps({ listNotifications: testNotifications });
    /*
    `render` method shouldn't have any more calls,
    after creating it
    */
    expect(Notifications.prototype.render.mock.calls).toEqual([[]]);

    Notifications.prototype.render.mockRestore();
  });

  it('re-renders when its props are updated, and the `listNotifications` prop is longer', () => {
    let testNotifications = [
      { guid: 1, type: 'urgent', value: 'Hello' },
      { guid: 2, type: 'default', value: 'World' },
      { guid: 3, type: 'default', html: {__html: '<strong>Congratulations!</strong>'} },
    ];

    jest.spyOn(Notifications.prototype, 'render');

    const wrapper = mount(<Notifications displayDrawer={true} listNotifications={testNotifications} />);
    // 1 render call, to render the component initially
    expect(Notifications.prototype.render.mock.calls).toEqual([[]]);

    testNotifications = [...testNotifications, { guid: 4, type: 'urgent', value: 'Testing!' }];
    wrapper.setProps({ displayDrawer: true, listNotifications: testNotifications });
    // 2 render calls, to re-render the component after a new and longer testNotifications list was passed
    expect(Notifications.prototype.render.mock.calls).toEqual([[], []]);

    testNotifications = [...testNotifications, { guid: 5, type: 'default', value: '1, 2. 3...' }];
    wrapper.setProps({ displayDrawer: false, listNotifications: testNotifications });
    // 3 render calls, to re-render the component after a new and longer testNotifications list was passed
    expect(Notifications.prototype.render.mock.calls).toEqual([[], [], []]);

    Notifications.prototype.render.mockRestore();
  });

  it('calls the `handleDisplayDrawer` func when clicking on its menuItem', () => {
    const spyHandleDisplayDrawer = jest.fn();
    const wrapper = mount(<Notifications handleDisplayDrawer={spyHandleDisplayDrawer} />);
    const menuItemP = wrapper.find(`.${css(notificationsStyles.menuItemP)}`).first();
    menuItemP.simulate('click');
    expect(spyHandleDisplayDrawer.mock.calls).toEqual([[]]);
  });
  it('calls the `handleHideDrawer` func when clicking on its close button', () => {
    const spyHandleHideDrawer = jest.fn();
    const wrapper = mount(<Notifications displayDrawer={true} handleHideDrawer={spyHandleHideDrawer} />);
    const closeButton = wrapper.find(`button[aria-label="Close"]`).first();
    closeButton.simulate('click');
    expect(spyHandleHideDrawer.mock.calls).toEqual([[]]);
  });

  it('calls the `fetchNotifications` func prop when mounted', () => {
    const spyFetchNotifications = jest.fn();
    mount(<Notifications fetchNotifications={spyFetchNotifications} />);
    expect(spyFetchNotifications.mock.calls).toEqual([[]]);
  });
});
