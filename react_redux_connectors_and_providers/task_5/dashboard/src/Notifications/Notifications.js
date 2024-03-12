import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchNotifications } from '../actions/notificationActionCreators';
import { Seq } from 'immutable'
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
    backgroundColor: 'white',
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

/**
 * Returns the values from `notifications.getIn(['entities', 'messages'])` as an `Immutable.Seq.Indexed<Notification>`
 * as `listNotifications`.
 * (THE NOTIFICATION OBJECTS IN THE SUEQUENCE SHOULD BE POJS OBJECTS, BUT THE RETURNED `listNotifications` SHOULD NOT BE,
 * AND SHOULD BE THE TYPE ABOVE)
 */
export function mapStateToProps({ notifications }) {
  return { listNotifications: notifications.getIn(['entities', 'messages']).valueSeq().map(notification => notification.toJS()) };
}

export const mapDispatchToProps = { fetchNotifications };

class Notifications extends React.PureComponent {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const { handleDisplayDrawer, handleHideDrawer } = this.props;

    const menuItemElement = (
      <div className={css(styles.menuItem, this.props.displayDrawer && styles.hiddenMenuItem)}>
        <p className={css(styles.menuItemP)} onClick={() => handleDisplayDrawer()}>Your notifications</p>
      </div>
    );

    const notificationsList = (
      <ul className={css(styles.NotificationsUl)}>
        {
          this.props.listNotifications && this.props.listNotifications.size && this.props.listNotifications.size > 0
          ? this.props.listNotifications.map(notification => (
            <NotificationItem key={`notificationId:${notification.guid}`} id={notification.guid} type={notification.type} value={notification.value} html={notification.html} markAsRead={this.props.markNotificationAsRead} />
          ))
          : (<NotificationItem key={`notificationId:${null}`} type="default" value="No new notifications for now" markAsRead={this.props.markNotificationAsRead} />)
        }
      </ul>
    );

    const notificationsDrawer = (
      <div className={css(this.props.displayDrawer ? styles.NotificationsDrawerOpen : undefined)}>
        <button onClick={() => handleHideDrawer()} style={{
          float: 'right',
          paddingTop: 18,
          paddingRight: 15,
          border: 'none',
          backgroundColor: 'transparent',
        }} aria-label="Close">
          <img style={{width: 10}} src={closeIcon} alt=""/>
        </button>
        {
          this.props.listNotifications && this.props.listNotifications.size && this.props.listNotifications.size > 0
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
  listNotifications: Seq.Indexed([]),
  displayDrawer: false,
  fetchNotifications: () => {},
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: (id) => console.log(`Marking notification ${id} as read.`),
};
Notifications.propTypes = {
  listNotifications: PropTypes.instanceOf(Seq.Indexed),
  displayDrawer: PropTypes.bool,
  fetchNotifications: PropTypes.func,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

export const StatelessNotifications = Notifications;
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
