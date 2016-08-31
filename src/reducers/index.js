import { combineReducers } from 'redux';

import entities from './entities';
import todos from './todos';

export const reducers = {
  entities,
  todos,
};

export default combineReducers(reducers);
