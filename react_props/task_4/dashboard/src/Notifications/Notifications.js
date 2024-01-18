import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-icon.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';
import './Notifications.css';

function closeButtonClicked() {
  console.log('Close button has been clicked');
}

export const menuItemElement = (
  <div className="menuItem">
    <p className="menuItemP">Your notifications</p>
  </div>
);

export const notificationsDrawer = (
  <div className="Notifications">
    <button onClick={closeButtonClicked} style={{
      float: 'right',
      paddingTop: 18,
      paddingRight: 15,
      border: 'none',
      backgroundColor: 'transparent'
    }} aria-label="Close">
      <img style={{width: 10}} src={closeIcon} alt=""/>
    </button>
    <p className="NotificationsTitle">Here is the list of notifications</p>
    <ul>
      <NotificationItem type="default" value="New course available" />
      <NotificationItem type="urgent" value="New resume available" />
      <NotificationItem type="urgent" html={{__html: getLatestNotification()}} />
    </ul>
  </div>
);

function Notifications({ displayDrawer }) {
  return (
    <div className="NotificationsMenu">
      {menuItemElement}
      {displayDrawer === true ? (notificationsDrawer) : <></>}
    </div>
  );
}

Notifications.defaultProps = {
  displayDrawer: false,
};
Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
};

export default Notifications;
