import { MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters, SET_LOADING_STATE, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';
import { markAsRead, setNotificationFilter, setLoadingState, setNotifications } from './notificationActionCreators';

describe('markAsRead', () => {
  it('returns { type: MARK_AS_READ, index: 1 }, when being called with argument: index=1', () => {
    expect(markAsRead(1)).toStrictEqual({
      type: MARK_AS_READ,
      index: 1,
    });
  });
});

describe('setNotificationFilter', () => {
  it("returns { type: SET_TYPE_FILTER, filter: <corresponding filter> }, when called with a `filter` argument from `NotificationTypeFilters`", () => {
    for (const filter of NotificationTypeFilters) {
      expect(setNotificationFilter(filter)).toStrictEqual({
        type: SET_TYPE_FILTER,
        filter,
      });
    }
  });
});

describe('setLoadingState', () => {
  it('returns `{ type: SET_LOADING_STATE, loading: true/false }` when called with `loading: true/false`', () => {
    expect(setLoadingState(false)).toStrictEqual({ type: SET_LOADING_STATE, loading: false });
    expect(setLoadingState(true)).toStrictEqual({ type: SET_LOADING_STATE, loading: true });
  });
});

describe('setNotifications', () => {
  it('returns `{ type: FETCH_NOTIFICATIONS_SUCCESS, data }` when called with an array of notifications as `data`', () => {
    const data = [
      {
        "id": "5debd76480edafc8af244228",
        "author": {
          "id": "5debd764a7c57c7839d722e9",
          "name": {
            "first": "Poole",
            "last": "Sanders"
          },
          "email": "poole.sanders@holberton.nz",
          "picture": "http://placehold.it/32x32",
          "age": 25
        },
        "context": {
          "guid": "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
          "isRead": true,
          "type": "urgent",
          "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
        }
      },
      {
        "id": "5debd764507712e7a1307303",
        "author": {
          "id": "5debd7648ba8641ce0a34ea4",
          "name": {
            "first": "Norton",
            "last": "Grimes"
          },
          "email": "norton.grimes@holberton.nz",
          "picture": "http://placehold.it/32x32",
          "age": 37
        },
        "context": {
          "guid": "cec84b7a-7be4-4af0-b833-f1485433f66e",
          "isRead": false,
          "type": "urgent",
          "value": "ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et. "
        }
      },
      {
        "id": "5debd76444dd4dafea89d53b",
        "author": {
          "id": "5debd764a7c57c7839d722e9",
          "name": {
            "first": "Poole",
            "last": "Sanders"
          },
          "email": "poole.sanders@holberton.nz",
          "picture": "http://placehold.it/32x32",
          "age": 25
        },
        "context": {
          "guid": "280913fe-38dd-4abd-8ab6-acdb4105f922",
          "isRead": false,
          "type": "urgent",
          "value": "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed"
        }
      },
    ];
    expect(setNotifications(data)).toStrictEqual({ type: FETCH_NOTIFICATIONS_SUCCESS, data });
  });
});
