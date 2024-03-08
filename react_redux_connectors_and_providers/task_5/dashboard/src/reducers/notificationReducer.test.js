import { fetchNotificationsSuccess, markAsRead, setNotificationFilter, setLoadingState } from '../actions/notificationActionCreators';
import { fromJS } from 'immutable';
import notificationReducer, { initialState } from './notificationReducer';

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

const filters = ['DEFAULT', 'URGENT', 'OTHER', undefined];

describe('notificationReducer', () => {
  it('deeply merges `fromJS(notificationsNormalizer(data))` with the state, when given an action with `type: FETCH_NOTIFICATIONS_SUCCESS`', () => {
    let state = notificationReducer(undefined, fetchNotificationsSuccess([
      {
        id: 'notifications:0',
        author: {
          id: 'users:0',
        },
        context: {
          guid: 'messages:0',
          isRead: false,
          type: 'default',
          value: 'Message 0!',
        },
      },
    ]));

    // console.log(state.toJS().entities);

    expect(state.get('result').toJS()).toStrictEqual(['notifications:0']);
    expect(state.get('entities').toJS()).toStrictEqual({
      users: {
        'users:0': {
          id: 'users:0',
        },
      },
      messages: {
        'messages:0': {
            guid: 'messages:0',
            isRead: false,
            type: 'default',
            value: 'Message 0!',
        },
      },
      notifications: {
        'notifications:0': {
          id: 'notifications:0',
          author: 'users:0',
          context: 'messages:0',
        },
      },
    });
    state = notificationReducer(state, fetchNotificationsSuccess([
      {
        id: 'notifications:1',
        author: {
          id: 'users:1',
        },
        context: {
          guid: 'messages:1',
          isRead: false,
          type: 'urgent',
          value: 'Message 1 Is Really Urgent!',
        },
      }
    ]));
    expect(state.get('result').toJS()).toStrictEqual(['notifications:0', 'notifications:1']);
    expect(state.get('entities').toJS()).toStrictEqual({
      users: {
        'users:0': {
          id: 'users:0',
        },
        'users:1': {
          id: 'users:1',
        },
      },
      messages: {
        'messages:0': {
          guid: 'messages:0',
          isRead: false,
          type: 'default',
          value: 'Message 0!',
        },
        'messages:1': {
          guid: 'messages:1',
          isRead: false,
          type: 'urgent',
          value: 'Message 1 Is Really Urgent!',
        },
      },
      notifications: {
        'notifications:0': {
          id: 'notifications:0',
          author: 'users:0',
          context: 'messages:0',
        },
        'notifications:1': {
          id: 'notifications:1',
          author: 'users:1',
          context: 'messages:1',
        },
      },
    });
  });

  it('(ONLY) marks the 2nd notification as read, when the action type is `MARK_AS_READ`', () => {
    // test with previous state having the 2nd notification unread
    let state = notificationReducer(fromJS(secondUnRead), markAsRead('cec84b7a-7be4-4af0-b833-f1485433f66e'));
    expect(state.get('result').toJS()).toStrictEqual(secondRead.result);
    expect(state.get('entities').toJS()).toStrictEqual(secondRead.entities);

    // test with previous state having the 2nd notification read
    state = notificationReducer(fromJS(secondRead), markAsRead('cec84b7a-7be4-4af0-b833-f1485433f66e'));
    expect(state.get('result').toJS()).toStrictEqual(secondRead.result);
    expect(state.get('entities').toJS()).toStrictEqual(secondRead.entities);
  });

  it("sets `filter` to the assigned filter", () => {
    for (const nextFilter of filters) {
      let state = notificationReducer(undefined, setNotificationFilter(nextFilter));
      expect(state.get('filter')).toBe(nextFilter);

      for (const prevFilter of filters) {
        const state = notificationReducer(fromJS({ ...(initialState.toJS()), filter: prevFilter }), setNotificationFilter(nextFilter));
        expect(state.get('filter')).toBe(nextFilter);
      }
    }
  });

  it("defaults `filter` to 'DEFAULT'", () => {
    expect(notificationReducer(undefined).get('filter')).toBe('DEFAULT');
  });

  it('sets `loading: action.loading` when an action with `type: SET_LOADING_STATE` is passed \
(`action.loading`) will be a boolean)', () => {
    let state = notificationReducer(initialState, setLoadingState(true));
    expect(state.get('loading')).toBe(true);
    state = notificationReducer(initialState, setLoadingState(false));
    expect(state.get('loading')).toBe(false);
    state = notificationReducer(initialState, setLoadingState(true));
    expect(state.get('loading')).toBe(true);
    state = notificationReducer(initialState, setLoadingState(false));
    expect(state.get('loading')).toBe(false);
  });
});
