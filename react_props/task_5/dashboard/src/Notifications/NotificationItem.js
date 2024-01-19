import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type, html, value }) {
  if (html) {
    return (
      <li data-notification-type={type} dangerouslySetInnerHTML={html} />
    );
  }
  return (
    <li data-notification-type={type}>{value}</li>
  );
  /*
  React should default to filling the <li /> with ''
  when `value` is undefined.
  */
}

NotificationItem.defaultProps = {
  type: 'default',
  html: null,
  value: '',
};
NotificationItem.propTypes = {
  type: PropTypes.string,  // .isRequired
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  value: PropTypes.string,
};

export default NotificationItem;
