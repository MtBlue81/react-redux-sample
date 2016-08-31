import { handleActions } from 'redux-actions';
import { List, Map } from 'immutable';

const initialState = Map();

export const fetch = (state, { payload }) => {
  const todos = payload.getIn(['result', 'todos'], List());
  return state.update(
                'todos',
                List(),
                (current) => current.concat(todos)
              );
};

export const handlers = {
  FETCH_TODO: fetch,
};

export default handleActions(handlers, initialState);
