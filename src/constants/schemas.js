import { Schema, arrayOf, normalize as _normalize } from 'normalizr';
import { fromJS } from 'immutable';

import Todo from '../models/todo';
import Person from '../models/person';

export { arrayOf };

export const todoSchema = new Schema(
  'todos',
  { idAttribute: (entity) => new Todo(fromJS(entity)).toEntityId() }
);

export const personSchema = new Schema(
  'people',
  { idAttribute: (entity) => new Person(fromJS(entity)).toEntityId() }
);

todoSchema.define({
  owner: personSchema,
});

const converts = [];
converts.push({
  path: ['entities', 'people'],
  updater: createUpdater('people', Person),
});

converts.push({
  path: ['entities', 'todos'],
  updater: createUpdater('todos', Todo),
});


function createUpdater(attributesName, modelKlass) {
  return (v, { [attributesName]: entityState }) => {
    if (entityState) {
      v = v.map((v) => {
        const entityId = new modelKlass(v).toEntityId();
        if (!entityId) return v;
        const entity = entityState.get(entityId);
        if (!entity) return v;
        return entity.merge(v);
      });
    }
    return v.map((v) => new modelKlass(v));
  };
}

export function normalize(obj, schema, options = {}) {
  const { state = {} } = options;
  const { entities = {} } = state;
  let data = _normalize(obj, schema, options);
  data = fromJS(data);
  converts.forEach(({ path, updater }) => {
    if (!data.hasIn(path)) return;
    try {
      data = data.updateIn(path, (v) => updater(v, entities));
    } catch (e) {
      console.warn('normalize: %s', e.message); // eslint-disable-line no-console
    }
  });
  return data;
}
