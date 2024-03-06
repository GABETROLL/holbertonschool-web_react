import rootReducer from "./rootReducer";
import { Map } from 'immutable';

describe('rootReducer', () => {
  it('returns the correct initial state', () => {
    expect(rootReducer()).toStrictEqual({ ui: Map(), notifications: Map(), courses: Map() });
  });
});
