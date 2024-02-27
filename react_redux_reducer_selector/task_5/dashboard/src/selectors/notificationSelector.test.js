import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';
import { initialState } from '../reducers/notificationReducer';
import { fromJS } from 'immutable';

const secondUnRead = {
  '1': {
    id: 1,
    isRead: false,
    type: 'default',
    value: 'New course available',
  },
  '2': {
    id: 2,
    isRead: false,
    type: 'urgent',
    value: 'New resume available',
  },
  '3': {
    id: 3,
    isRead: false,
    type: 'urgent',
    value: 'New data available',
  },
};
const secondRead = {
  '1': {
    id: 1,
    isRead: false,
    type: 'default',
    value: 'New course available',
  },
  '2': {
    id: 2,
    isRead: true,
    type: 'urgent',
    value: 'New resume available',
  },
  '3': {
    id: 3,
    isRead: false,
    type: 'urgent',
    value: 'New data available',
  },
};
const secondUnReadState = {
  filter: 'DEFAULT',
  result: [1, 2, 3],
  entities: {
    notifications: secondUnRead,
  },
};
const secondReadState = {
  ...secondUnReadState,
  entities: {
    notifications: secondRead,
  },
};

test('filterTypeSelected', () => {
  expect(filterTypeSelected(initialState)).toBe('DEFAULT');
  expect(filterTypeSelected(fromJS(secondUnReadState))).toBe('DEFAULT');
  expect(filterTypeSelected(fromJS(secondUnReadState))).toBe('DEFAULT');

  for (const otherState of [{ }, initialState, secondUnReadState, secondReadState]) {
    expect(filterTypeSelected(fromJS({ ...otherState, filter: 'DEFAULT' }))).toBe('DEFAULT');
    expect(filterTypeSelected(fromJS({ ...otherState, filter: 'URGENT' }))).toBe('URGENT');
    expect(filterTypeSelected(fromJS({ ...otherState, filter: 'OTHER' }))).toBe('OTHER');
  }
});

test('getNotifications', () => {
  expect(getNotifications(initialState).toJS()).toStrictEqual({ });
  expect(getNotifications(fromJS(secondUnReadState)).toJS()).toStrictEqual(secondUnRead);
  expect(getNotifications(fromJS(secondReadState)).toJS()).toStrictEqual(secondRead);

  for (const otherState of [{ }, initialState, secondUnReadState, secondReadState]) {
    expect(getNotifications(fromJS({ ...otherState, entities: { notifications: secondUnRead } })).toJS()).toStrictEqual(secondUnRead);
    expect(getNotifications(fromJS({ ...otherState, entities: { notifications: secondRead } })).toJS()).toStrictEqual(secondRead);
  }
});

test('getUnreadNotifications', () => {
  expect(getUnreadNotifications(initialState).toJS()).toStrictEqual({ });
  expect(getUnreadNotifications(fromJS(secondUnReadState)).toJS()).toStrictEqual(secondUnRead);

  for (const otherState of [{ }, initialState, secondUnReadState, secondReadState]) {
    console.log(otherState);

    expect(getUnreadNotifications(fromJS({ ...otherState, entities: { notifications: secondUnRead } })).toJS()).toStrictEqual(secondUnRead);
    expect(getUnreadNotifications(fromJS({ ...otherState, entities: { notifications: secondRead } })).toJS()).toStrictEqual({
      '1': {
        id: 1,
        isRead: false,
        type: 'default',
        value: 'New course available',
      },
      '3': {
        id: 3,
        isRead: false,
        type: 'urgent',
        value: 'New data available',
      },
    });
  }
});
