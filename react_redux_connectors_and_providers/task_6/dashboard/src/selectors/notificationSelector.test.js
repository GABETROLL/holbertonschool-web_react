import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';
import { initialState } from '../reducers/notificationReducer';
import { fromJS } from 'immutable';

const secondUnRead = {
  result: [
    "5debd76480edafc8af244228",
    "5debd764507712e7a1307303",
    "5debd76444dd4dafea89d53b",
    "5debd76485ee4dfd1284f97b",
    "5debd7644e561e022d66e61a",
  ],
  entities: {
    users: {
      '5debd764a7c57c7839d722e9': {
        "id": "5debd764a7c57c7839d722e9",
        "name": {
          "first": "Poole",
          "last": "Sanders"
        },
        "email": "poole.sanders@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 25,
      },
      '5debd7648ba8641ce0a34ea4': {
        "id": "5debd7648ba8641ce0a34ea4",
        "name": {
          "first": "Norton",
          "last": "Grimes"
        },
        "email": "norton.grimes@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 37,
      },
      '5debd764a7c57c7839d722e9': {
        "id": "5debd764a7c57c7839d722e9",
        "name": {
          "first": "Poole",
          "last": "Sanders"
        },
        "email": "poole.sanders@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 25,
      },
      '5debd764f07f50822352e252': {
        "id": "5debd764f07f50822352e252",
        "name": {
          "first": "Roach",
          "last": "Cameron"
        },
        "email": "roach.cameron@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 26,
      },
      '5debd764e66586653a8a33f3': {
        "id": "5debd764e66586653a8a33f3",
        "name": {
          "first": "Christy",
          "last": "Collier"
        },
        "email": "christy.collier@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 27,
      },
    },
    messages: {
      '2d8e40be-1c78-4de0-afc9-fcc147afd4d2': {
        "guid": "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
        "isRead": false,
        "type": "urgent",
        "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      },
      'cec84b7a-7be4-4af0-b833-f1485433f66e': {
        "guid": "cec84b7a-7be4-4af0-b833-f1485433f66e",
        "isRead": false,
        "type": "urgent",
        "value": "ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et. ",
      },
      '280913fe-38dd-4abd-8ab6-acdb4105f922': {
        "guid": "280913fe-38dd-4abd-8ab6-acdb4105f922",
        "isRead": false,
        "type": "urgent",
        "value": "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed",
      },
      '89906f88-a02d-41ee-b214-daa0c54633e3': {
        "guid": "89906f88-a02d-41ee-b214-daa0c54633e3",
        "isRead": false,
        "type": "urgent",
        "value": "Odio pellentesque diam volutpat commodo sed egestas egestas",
      },
      'f8d66cca-63ec-4f19-a422-a3e1c8f05a36': {
        "guid": "f8d66cca-63ec-4f19-a422-a3e1c8f05a36",
        "isRead": false,
        "type": "urgent",
        "value": "In hendrerit gravida rutrum quisque non tellus orci. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Lorem mollis aliquam ut porttitor",
      },
    },
    notifications: {
      "5debd76480edafc8af244228": {
        "id": "5debd76480edafc8af244228",
        "author": '5debd764a7c57c7839d722e9',
        "context": '2d8e40be-1c78-4de0-afc9-fcc147afd4d2'
      },
      "5debd764507712e7a1307303": {
        "id": "5debd764507712e7a1307303",
        "author": '5debd7648ba8641ce0a34ea4',
        "context": 'cec84b7a-7be4-4af0-b833-f1485433f66e',
      },
      "5debd76444dd4dafea89d53b": {
        "id": "5debd76444dd4dafea89d53b",
        "author": '5debd764a7c57c7839d722e9',
        "context": '280913fe-38dd-4abd-8ab6-acdb4105f922',
      },
      "5debd76485ee4dfd1284f97b": {
        "id": "5debd76485ee4dfd1284f97b",
        "author": '5debd764f07f50822352e252',
        "context": '89906f88-a02d-41ee-b214-daa0c54633e3',
      },
      "5debd7644e561e022d66e61a": {
        "id": "5debd7644e561e022d66e61a",
        "author": '5debd764e66586653a8a33f3',
        "context": 'f8d66cca-63ec-4f19-a422-a3e1c8f05a36',
      },
    },
  },
};

const secondRead = {
  result: [
    "5debd76480edafc8af244228",
    "5debd764507712e7a1307303",
    "5debd76444dd4dafea89d53b",
    "5debd76485ee4dfd1284f97b",
    "5debd7644e561e022d66e61a",
  ],
  entities: {
    users: {
      '5debd764a7c57c7839d722e9': {
        "id": "5debd764a7c57c7839d722e9",
        "name": {
          "first": "Poole",
          "last": "Sanders"
        },
        "email": "poole.sanders@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 25,
      },
      '5debd7648ba8641ce0a34ea4': {
        "id": "5debd7648ba8641ce0a34ea4",
        "name": {
          "first": "Norton",
          "last": "Grimes"
        },
        "email": "norton.grimes@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 37,
      },
      '5debd764a7c57c7839d722e9': {
        "id": "5debd764a7c57c7839d722e9",
        "name": {
          "first": "Poole",
          "last": "Sanders"
        },
        "email": "poole.sanders@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 25,
      },
      '5debd764f07f50822352e252': {
        "id": "5debd764f07f50822352e252",
        "name": {
          "first": "Roach",
          "last": "Cameron"
        },
        "email": "roach.cameron@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 26,
      },
      '5debd764e66586653a8a33f3': {
        "id": "5debd764e66586653a8a33f3",
        "name": {
          "first": "Christy",
          "last": "Collier"
        },
        "email": "christy.collier@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 27,
      },
    },
    messages: {
      '2d8e40be-1c78-4de0-afc9-fcc147afd4d2': {
        "guid": "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
        "isRead": false,
        "type": "urgent",
        "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      },
      'cec84b7a-7be4-4af0-b833-f1485433f66e': {
        "guid": "cec84b7a-7be4-4af0-b833-f1485433f66e",
        "isRead": true,
        "type": "urgent",
        "value": "ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et. ",
      },
      '280913fe-38dd-4abd-8ab6-acdb4105f922': {
        "guid": "280913fe-38dd-4abd-8ab6-acdb4105f922",
        "isRead": false,
        "type": "urgent",
        "value": "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed",
      },
      '89906f88-a02d-41ee-b214-daa0c54633e3': {
        "guid": "89906f88-a02d-41ee-b214-daa0c54633e3",
        "isRead": false,
        "type": "urgent",
        "value": "Odio pellentesque diam volutpat commodo sed egestas egestas",
      },
      'f8d66cca-63ec-4f19-a422-a3e1c8f05a36': {
        "guid": "f8d66cca-63ec-4f19-a422-a3e1c8f05a36",
        "isRead": false,
        "type": "urgent",
        "value": "In hendrerit gravida rutrum quisque non tellus orci. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Lorem mollis aliquam ut porttitor",
      },
    },
    notifications: {
      "5debd76480edafc8af244228": {
        "id": "5debd76480edafc8af244228",
        "author": '5debd764a7c57c7839d722e9',
        "context": '2d8e40be-1c78-4de0-afc9-fcc147afd4d2'
      },
      "5debd764507712e7a1307303": {
        "id": "5debd764507712e7a1307303",
        "author": '5debd7648ba8641ce0a34ea4',
        "context": 'cec84b7a-7be4-4af0-b833-f1485433f66e',
      },
      "5debd76444dd4dafea89d53b": {
        "id": "5debd76444dd4dafea89d53b",
        "author": '5debd764a7c57c7839d722e9',
        "context": '280913fe-38dd-4abd-8ab6-acdb4105f922',
      },
      "5debd76485ee4dfd1284f97b": {
        "id": "5debd76485ee4dfd1284f97b",
        "author": '5debd764f07f50822352e252',
        "context": '89906f88-a02d-41ee-b214-daa0c54633e3',
      },
      "5debd7644e561e022d66e61a": {
        "id": "5debd7644e561e022d66e61a",
        "author": '5debd764e66586653a8a33f3',
        "context": 'f8d66cca-63ec-4f19-a422-a3e1c8f05a36',
      },
    },
  },
};

test('filterTypeSelected', () => {
  expect(filterTypeSelected(initialState)).toBe('DEFAULT');

  for (const otherState of [{ }, initialState, secondRead, secondUnRead]) {
    expect(filterTypeSelected(fromJS({ ...otherState, filter: 'DEFAULT' }))).toBe('DEFAULT');
    expect(filterTypeSelected(fromJS({ ...otherState, filter: 'URGENT' }))).toBe('URGENT');
    expect(filterTypeSelected(fromJS({ ...otherState, filter: 'OTHER' }))).toBe('OTHER');
  }
});

test('getNotifications', () => {
  const secondUnreadNotifications = Object.values(secondUnRead.entities.messages);
  const secondReadNotifications = Object.values(secondRead.entities.messages);

  expect(getNotifications(initialState).toJS()).toStrictEqual([]);
  expect(getNotifications(fromJS(secondUnRead)).toJS()).toStrictEqual(secondUnreadNotifications);
  expect(getNotifications(fromJS(secondRead)).toJS()).toStrictEqual(secondReadNotifications);

  for (const otherState of [{ }, initialState, secondRead, secondUnRead]) {
    expect(getNotifications(fromJS({ ...otherState, ...secondUnRead})).toJS()).toStrictEqual(secondUnreadNotifications);
    expect(getNotifications(fromJS({ ...otherState, ...secondRead})).toJS()).toStrictEqual(secondReadNotifications);
  }
});

test('getUnreadNotifications', () => {
  const notificationsWithSecond = Object.values(secondUnRead.entities.messages).filter(notification => !(notification.isRead));
  const notificationsWithoutSecond = Object.values(secondRead.entities.messages).filter(notification => !(notification.isRead));

  expect(getUnreadNotifications(initialState).toJS()).toStrictEqual([]);
  expect(getUnreadNotifications(fromJS(secondUnRead)).toJS()).toStrictEqual(notificationsWithSecond);
  expect(getUnreadNotifications(fromJS(secondRead)).toJS()).toStrictEqual(notificationsWithoutSecond);

  for (const otherState of [{ }, initialState, secondRead, secondUnRead]) {
    // console.log(otherState);

    expect(getUnreadNotifications(fromJS({ ...otherState, ...secondUnRead })).toJS()).toStrictEqual(notificationsWithSecond);
    expect(getUnreadNotifications(fromJS({ ...otherState, ...secondRead })).toJS()).toStrictEqual(notificationsWithoutSecond);
  }
});
