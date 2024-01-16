import React from 'react';

export default function NotificationItem({ type, html, value }) {
  return (
    <li data-notification-type={type || 'default'} dangerouslySetInnerHTML={{__html: html || value || ''}}/>
    /* just do both? :O */
  );
}
