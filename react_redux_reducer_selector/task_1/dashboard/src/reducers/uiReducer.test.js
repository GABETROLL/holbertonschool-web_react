import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import uiReducer, { initialState } from './uiReducer';

describe('uiReducer', () => {
  it('returns `initialState` when no action is passed', () => {
    expect(uiReducer().toJS()).toStrictEqual(initialState);
  });
  it('returns `initialState` when a `SELECT_COURSE` action is passed', () => {
    expect(uiReducer(initialState, { type: SELECT_COURSE, index: -908 }).toJS()).toStrictEqual(initialState);
  });
  it('returns new state with isNotificationDrawerVisible=true, when a `DISPLAY_NOTIFICATION_DRAWER` action is passed', () => {
    expect(uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER }).get('isNotificationDrawerVisible')).toBe(true);
  });
});
