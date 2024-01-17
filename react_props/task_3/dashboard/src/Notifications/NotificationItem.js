import React from 'react';

export default function NotificationItem({ type, html, value }) {
  if (html) {
    return (
      <li data-notification-type={type || 'default'} dangerouslySetInnerHTML={{__html: html}} />
    );
  }
  return (
    <li data-notification-type={type || 'default'}>{value}</li>
  );
}
