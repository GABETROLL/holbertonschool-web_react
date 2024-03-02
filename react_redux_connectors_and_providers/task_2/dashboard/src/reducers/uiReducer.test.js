import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
// TODO: REMOVE
import { SELECT_COURSE } from '../actions/courseActionTypes';
import { login } from '../actions/uiActionCreators';
import uiReducer, { initialState } from './uiReducer';

describe('uiReducer', () => {
  it('returns `initialState` when no action is passed', () => {
    expect(uiReducer().toJS()).toStrictEqual(initialState.toJS());
  });
  // TODO: REMOVE
  it('returns `initialState` when a `SELECT_COURSE` action is passed', () => {
    expect(uiReducer(initialState, { type: SELECT_COURSE, index: -908 }).toJS()).toStrictEqual(initialState.toJS());
  });
  it('returns new state with isNotificationDrawerVisible=true, when a `DISPLAY_NOTIFICATION_DRAWER` action is passed', () => {
    expect(uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER }).get('isNotificationDrawerVisible')).toBe(true);
  });
  it('returns new state with `user: { email, password }`, when a `login(email, password)` action is passed', () => {
    expect(uiReducer(initialState, login('hello', 'world')).toJS())
      .toStrictEqual({ ...initialState, user: { email: 'hello', password: 'world' } });
  });
});
