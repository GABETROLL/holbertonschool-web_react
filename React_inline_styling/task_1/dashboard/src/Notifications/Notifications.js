import React from 'react';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import { StyleSheet, css } from 'aphrodite';
import { red } from '../styleColor';

/* TODO: finish styling */
export const styles = StyleSheet.create({
  NotificationsMenu: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    fontSize: 24,
  },
  menuItem: {
    textAlign: 'right',
  },
  menuItemP: {
    marginTop: 12,
    marginBottom: 14,
  },
  Notifications: {
    maxWidth: 600,
    marginLeft: 'auto',
    paddingBottom: 5,
    paddingLeft: 15,
    borderWidth: 2,
    borderColor: red,
    borderStyle: 'dashed',
  },
  NotificationsTitle: {
    marginTop: 30,
  },
  NotificationsUl: {
    paddingLeft: 56,
  },
});

function closeButtonClicked() {
  console.log('Close button has been clicked');
}

export const menuItemElement = (
  <div className={css(styles.menuItem)}>
    <p className={css(styles.menuItemP)}>Your notifications</p>
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

  shouldComponentUpdate(nextProps) {
    return nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  render() {
    const notificationsList = (
      <ul className={css(styles.NotificationsUl)}>
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
      <div className={css(styles.Notifications)}>
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
          ? (<p className={css(styles.NotificationsTitle)}>Here is the list of notifications</p>)
          : (<></>)
        }
        {notificationsList}
      </div>
    );

    return (
      <div className={css(styles.NotificationsMenu)}>
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
