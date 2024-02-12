import * as notifications from '../notifications.json';

export function getAllNotificationsByUser(userId) {
  return notifications
    .filter(notification => notification.author.id === userId)
    .map(notification => notification.context);
}
