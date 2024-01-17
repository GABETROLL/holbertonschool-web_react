import React from 'react';

export default function NotificationItem({ type, html, value }) {
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
};
NotificationItem.propTypes = {
  type: PropTypes.string,  // .isRequired
  html: PropTypes.shape({
    __html: PropTypes.string.isRequired,
  }),
  value: PropTypes.string,
};
