import { Record } from 'immutable';
import {EntityIdGenerator} from './utils';

const generator = new EntityIdGenerator('person');
const defaultValues = {
  id: undefined,
  name: '',
};

export default class Person extends Record(defaultValues) {

  toEntityId() {
    return generator.toEntityId(this.get('id').toString());
  }

  static parseEntityId(entityId) {
    return generator.parse(entityId, (id) => parseInt(id, 10));
  }
}
