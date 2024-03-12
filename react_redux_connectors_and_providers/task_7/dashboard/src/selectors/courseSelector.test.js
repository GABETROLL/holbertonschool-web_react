import { fromJS } from 'immutable';
import { initialState } from '../reducers/courseReducer';
import courseSelector from './courseSelector';

const a = {
  '0': {
    credit: 1,
    id: 0,
    isSelected: false,
    name: 'Bash',
  },
  '1': {
    credit: 10,
    id: 1,
    isSelected: true,
    name: 'C',
  },
  '2': {
    credit: 6,
    id: 2,
    isSelected: false,
    name: 'Python',
  },
};
const b = {
  '3': {
    credit: 60,
    id: 1,
    isSelected: true,
    name: "ES6",
  },
  '4': {
    credit: 20,
    id: 2,
    isSelected: false,
    name: "Webpack",
  },
  '5': {
    credit: 40,
    id: 3,
    isSelected: true,
    name: "React",
  },
};

test('courseSelector returns the correct courses, in the `coursesState` argument', () => {
  expect(courseSelector(initialState).toJS()).toStrictEqual([]);
  expect(courseSelector(fromJS({ result: [0, 1, 2], entities: { courses: a } })).toJS()).toStrictEqual(Object.values(a));
  expect(courseSelector(fromJS({ result: [3, 4, 5], entities: { courses: b } })).toJS()).toStrictEqual(Object.values(b));
});
