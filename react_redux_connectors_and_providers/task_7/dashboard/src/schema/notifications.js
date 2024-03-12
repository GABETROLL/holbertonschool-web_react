import * as notifications_json_obj from '../../notifications.json';
import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export const notifications = normalize(notifications_json_obj.default, [notification]);

export function getAllNotificationsByUser(userId) {
  const result = [];
  for (const notification of Object.values(notifications.entities.notifications)) {
    if (notification.author === userId) result.push(notifications.entities.messages[notification.context]);
  }
  return result;
}

export function notificationsNormalizer(data) {
  return normalize(data, [notification]);
}
