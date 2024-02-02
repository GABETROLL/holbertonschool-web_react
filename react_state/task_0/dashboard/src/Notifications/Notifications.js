import React from 'react';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import { StyleSheet, css } from 'aphrodite';
import { red } from '../styles';

const opacityKeyFrames = {
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
  '100%': {
    opacity: 1,
  },
};
const bounceKeyFrames = {
  '0%': {
    transform: 'translateY(0)',
  },
  '50%': {
    transform: 'translateY(-5px)',
  },
  '75%': {
    transform: 'translateY(5px)',
  },
  '100%': {
    transform: 'translateY(0)',
  },
};

export const styles = StyleSheet.create({
  NotificationsMenu: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    fontSize: 20,
  },
  menuItem: {
    width: 'fit-content',
    float: 'right',
    backgroundColor: '#fff8f8',
    cursor: 'pointer',
    ':hover': {
      animationName: [opacityKeyFrames, bounceKeyFrames],
      animationDuration: '1s, 0.5s',
      animationIterationCount: 3,
    },
  },
  hiddenMenuItem: {
    display: 'none',
  },
  menuItemP: {
    marginTop: 12,
    marginBottom: 14,
  },
  NotificationsDrawerOpen: {
    maxWidth: 600,
    marginLeft: 'auto',
    paddingBottom: 5,
    paddingLeft: 15,
    borderWidth: 2,
    borderColor: red,
    borderStyle: 'dashed',
    '@media (max-width: 900px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      padding: 0,
      border: 'none',
      margin: 0,
      backgroundColor: 'white',
    },
  },
  NotificationsTitle: {
    marginTop: 30,
    '@media (max-width: 900px)': {
      marginTop: 22,
    }
  },
  NotificationsUl: {
    paddingLeft: 56,
    '@media (max-width: 900px)': {
      padding: 0,
      marginBottom: 0,
    }
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
    /*
    Change when closing/opening the drawer, or when the next notifications are bigger
    IF A NEW NOTIFICATION THAT WASN'T PRESENT IS IN THE NEW, SMALLER NOTIFICATIONS LIST,
    AND ALL OF THE OTHER PROPS ARE THE SAME, THE COMPONENT WON'T UPDATE!!!
    */
    return nextProps.displayDrawer != this.props.displayDrawer || nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  render() {
    const { handleDisplayDrawer, handleHideDrawer } = this.props;

    const menuItemElement = (
      <div className={css(styles.menuItem, this.props.displayDrawer && styles.hiddenMenuItem)}>
        <p className={css(styles.menuItemP)} onClick={handleDisplayDrawer}>Your notifications</p>
      </div>
    );

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
      <div className={css(this.props.displayDrawer ? styles.NotificationsDrawerOpen : undefined)}>
        <button onClick={handleHideDrawer} style={{
          float: 'right',
          paddingTop: 18,
          paddingRight: 15,
          border: 'none',
          backgroundColor: 'transparent',
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
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};
Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

export default Notifications;
