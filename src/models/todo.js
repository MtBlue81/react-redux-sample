import { Record } from 'immutable';
import {EntityIdGenerator} from './utils';

const STATUS = {
  CREATED:   'created',
  COMPLETED: 'completed',
};

export const TODO_STATUS = Object.keys(STATUS).map((key) => STATUS[key]);

const generator = new EntityIdGenerator('todo');
const defaultValues = {
  id: undefined,
  text: '',
  status: STATUS.CREATED,
  created: undefined,
  owner: undefined,
};

export default class Todo extends Record(defaultValues) {

  get isCompleted() {
    return this.status === STATUS.COMPLETED;
  }

  complete(yes) {
    return this.set('status',yes ? STATUS.COMPLETED : STATUS.CREATED);
  }

  toEntityId() {
    return generator.toEntityId(this.get('id').toString());
  }

  static parseEntityId(entityId) {
    return generator.parse(entityId, (id) => parseInt(id, 10));
  }
}
