import { combineReducers } from 'redux';

import people from './people';
import todos from './todos';

export const reducers = {
  people,
  todos,
};

export default combineReducers(reducers);
