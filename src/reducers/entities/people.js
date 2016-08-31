import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import Person from '../../models/person';

const samplePeople = [
  {name: 'Sansan太郎', id: 'p101'},
  {name: '青山修平', id: 'p102'},
];
const initialState = samplePeople.reduce((v, sample) => {
  const person = new Person(sample);
  return v.set(
    person.toEntityId(), person
  );
}, Map());

export function merge(state, { payload }) {
  const people = payload.getIn(['entities', 'people'], Map());
  return state.merge(people);
}

const handlers = {
  FETCH_TODO: merge,
};

export default handleActions(handlers, initialState);
