import React from 'react';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import closeIcon from '../assets/close-icon.png';
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

// export const notificationsDrawer = ...;

class Notifications extends React.Component {
  /*
  TODO: "Make sure to bind the function `markAsRead`
    in your constructor
    to avoid unecessary re-rendering"
  */
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const notificationsList = (
      <ul>
        {
          this.props.listNotifications && this.props.listNotifications.length && this.props.listNotifications.length > 0
          ? this.props.listNotifications.map(notification => (
            <NotificationItem key={`notificationId:${notification.id}`} id={notification.id} type={notification.type} value={notification.value} html={notification.html} markAsRead={this.markAsRead} />
          ))
          : (<NotificationItem key={`notificationId:${undefined}`} type="default" value="No new notifications for now" markAsRead={this.markAsRead} />)
        }
      </ul>
    );

    const notificationsDrawer = (
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
        {
          this.props.listNotifications && this.props.listNotifications.length && this.props.listNotifications.length > 0
          ? (<p className="NotificationsTitle">Here is the list of notifications</p>)
          : (<></>)
        }
        {notificationsList}
      </div>
    );

    return (
      <div className="NotificationsMenu">
        {menuItemElement}
        {this.props.displayDrawer === true ? notificationsDrawer : <></>}
      </div>
    );
  }
}

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};
Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

export default Notifications;
