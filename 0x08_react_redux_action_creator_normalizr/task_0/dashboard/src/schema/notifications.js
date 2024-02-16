import * as notifications from '../../notifications.json';

export function getAllNotificationsByUser(userId) {
  return notifications.default
    .filter(notification => notification.author && notification.author.id === userId)
    .map(notification => notification.context);
}
