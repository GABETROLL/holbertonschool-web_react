import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export const styles = StyleSheet.create({
  notificationItem: {
    fontSize: 20,
    '@media (max-width: 900px)': {
      listStyle: 'none',
      padding: '10px 8px',
      borderBottom: '1px black solid',
    },
  },
  defaultNotification: {
    color: 'navy',
  },
  urgentNotification: {
    color: 'red',
  },
});

const NotificationItem = React.memo(
  class NotificationItem extends React.Component {
    render() {
      // console.log(`NotificationItem with id ${this.props.id} is being rendered, at: ${(new Date()).toLocaleTimeString()}`);

      if (this.props.html) {
        return (
          <li className={css(styles.notificationItem, this.props.type === 'urgent' ? styles.urgentNotification : styles.defaultNotification )}
            onClick={() => this.props.markAsRead(this.props.id)}
            data-notification-type={this.props.type} dangerouslySetInnerHTML={this.props.html}
          />
        );
      }
      return (
        <li className={css(styles.notificationItem, this.props.type === 'urgent' ? styles.urgentNotification : styles.defaultNotification )}
          onClick={() => this.props.markAsRead(this.props.id)}
          data-notification-type={this.props.type}>
            {this.props.value}
        </li>
      );
      /*
      React should default to filling the <li /> with ''
      when `value` is undefined.
      */
    }
  }
);

NotificationItem.defaultProps = {
  type: 'default',
  html: null,
  value: '',
  id: 0,
  markAsRead: () => {},
};
NotificationItem.propTypes = {
  type: PropTypes.string,  // .isRequired
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  value: PropTypes.string,
  id: PropTypes.number,
  markAsRead: PropTypes.func,
};

export default NotificationItem;
