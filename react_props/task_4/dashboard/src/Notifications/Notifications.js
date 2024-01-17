import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-icon.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';
import './Notifications.css';

export const menuItemElement = (
  <div className="menuItem">
    <p>Your notifications</p>
  </div>
);

export const notificationsDrawer = (
  <div className="Notifications">
    <button onClick={closeButtonClicked} style={{
      marginTop: 10,
      marginRight: 5,
      float: 'right',
      border: 'none',
      backgroundColor: 'transparent'
    }} aria-label="Close">
      <img style={{width: 10}} src={closeIcon} alt=""/>
    </button>
    <p>Here is the list of notifications</p>
    <ul>
      <NotificationItem type="default" value="New course available" />
      <NotificationItem type="urgent" value="New resume available" />
      <NotificationItem type="urgent" html={{__html: getLatestNotification()}} />
    </ul>
  </div>
);

export default function Notifications({ displayDrawer }) {
  function closeButtonClicked() {
    console.log('Close button has been clicked');
  }

  return (
    <>
      {menuItemElement}
      {displayDrawer === true ? (notificationsDrawer) : <></>}
    </>
  );
}

Notifications.defaultProps = {
  displayDrawer: false,
};
Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
};
