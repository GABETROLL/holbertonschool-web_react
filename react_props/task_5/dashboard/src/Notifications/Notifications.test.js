import React from 'react';
import { shallow } from 'enzyme';
import { menuItemElement, notificationsDrawer } from './Notifications';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
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
      for (const listNotifications of [undefined, [
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

  it('renders the div.menuItem when displayDrawer={false}', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.contains(menuItemElement)).toBe(true);
  });

  it('does not render the div.Notifications when displayDrawer={false}', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find('div.Notifications')).toHaveLength(0);
  });

  it('renders correctly when given no `listNotifications` array or an empty one', () => {
    const expectedHtml = (
      '<div class="NotificationsMenu"><div class="menuItem"><p class="menuItemP">Your notifications</p></div><div class="Notifications"><button style="float:right;padding-top:18px;padding-right:15px;border:none;background-color:transparent" aria-label="Close"><img style="width:10px" src="test-file-stub" alt=""/></button><ul><li data-notification-type="default">No new notifications for now</li></ul></div></div>'
    );
    const expectedUlHtml = (
      `<ul><li data-notification-type="default">No new notifications for now</li></ul>`
    );

    for (const wrapper of [
      shallow(<Notifications displayDrawer={true} />),
      shallow(<Notifications displayDrawer={true} listNotifications={[]} />)
    ]) {
      // console.log(wrapper.html())
      expect(wrapper.html()).toBe(expectedHtml);

      const foundNotificationItems = wrapper.find('ul');
      expect(foundNotificationItems).toHaveLength(1);
      expect(foundNotificationItems.first().html()).toBe(expectedUlHtml);
    }
  });

  it('renders correctly when given a `listNotifications` array with notifications inside', () => {
    // component renders list correctly
    const expectedHtml = (
      `<ul>\
<li data-notification-type="default">New course available</li>\
<li data-notification-type="urgent">New resume available</li>\
<li data-notification-type="urgent">${getLatestNotification()}</li>\
</ul>`
    );

    // console.log(wrapper.html());

    const foundUl = usedWrapper.find('ul');
    expect(foundUl).toHaveLength(1);
    expect(foundUl.first().html()).toBe(expectedHtml);
    // component renders the right amount of NotificationItem
    expect(usedWrapper.find(NotificationItem)).toHaveLength(3);
  });

  it(`doesn't render the message "Here is the list of notifications"\
 and renders "No new notifications for now", when listNotifications is empty`, () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    // console.log(wrapper.html());
    expect(wrapper.html().includes('Here is the list of notifications')).toBe(false);
    expect(wrapper.find('ul').first().html()).toBe('<ul><li data-notification-type="default">No new notifications for now</li></ul>');
  });

  it('renders the div.menuItem when displayDrawer={true}', () => {
    expect(displayedDrawer.contains(menuItemElement)).toBe(true);
  });

  it('renders the div.Notifications when displayDrawer={true}', () => {
    expect(displayedDrawer.find('div.Notifications')).toHaveLength(1);
  });

  it('renders 3 <NotificationItem /> when displayDrawer={true}', () => {
    expect(usedWrapper.find(NotificationItem)).toHaveLength(3);
  });

  it('the first <NotificationItem /> has the correct HTML rendered when displayDrawer={true}', () => {
    expect(usedWrapper.find(NotificationItem).first().html())
      .toBe('<li data-notification-type="default">New course available</li>');
  });

  it('renders <p className="NotificationsTitle">Here is the list of notifications</p> when displayDrawer={true}', () => {
    expect(usedWrapper.contains(<p className="NotificationsTitle">Here is the list of notifications</p>)).toBe(true);
  });
});
