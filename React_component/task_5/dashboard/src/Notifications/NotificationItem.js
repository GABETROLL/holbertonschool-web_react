import React from 'react';
import PropTypes from 'prop-types';

const NotificationItem = React.memo(
  class NotificationItem extends React.Component {
    render() {
      // console.log(`NotificationItem with id ${this.props.id} is being rendered, at: ${(new Date()).toLocaleTimeString()}`);

      if (this.props.html) {
        return (
          <li onClick={() => this.props.markAsRead(this.props.id)} data-notification-type={this.props.type} dangerouslySetInnerHTML={this.props.html} />
        );
      }
      return (
        <li onClick={() => this.props.markAsRead(this.props.id)} data-notification-type={this.props.type}>{this.props.value}</li>
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
