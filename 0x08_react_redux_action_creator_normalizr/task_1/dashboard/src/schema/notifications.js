import * as notifications_json_obj from '../notifications.json';
import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');
const message = new schema.Entity('messages', { idAttribute: 'guid' });
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});
export const notifications = normalize(notifications_json_obj, [notification]);

export function getAllNotificationsByUser(userId) {
  return notifications
    .filter(notification => notification.author.id === userId)
    .map(notification => notification.context);
}
