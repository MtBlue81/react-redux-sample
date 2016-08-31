import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

const initialState = Map();

export function merge(state, { payload }) {
  const todos = payload.getIn(['entities', 'todos'], Map());
  return state.merge(todos);
}

const handlers = {
  FETCH_TODO: merge,
  UPDATE_TODO: merge,
};

export default handleActions(handlers, initialState);
