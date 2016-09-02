import { listOf } from 'react-immutable-proptypes';
import { PropTypes } from 'react';
import { TODO_STATUS } from '../models/todo';

const {
  number,
  oneOf,
  oneOfType,
  shape,
  string,
  bool,
} = PropTypes;

// person
export const person = shape({
  name: string,
  id: string.isRequired,
});

// todos
export const todo = shape({
  id: number.isRequired,
  text: string,
  status: oneOf(TODO_STATUS).isRequired,
  owner: oneOfType([person, string]),
  isCompleted: bool,
});

export default {
  listOf,
  person,
  todo,
};
