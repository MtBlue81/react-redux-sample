import { arrayOf, normalize } from '../constants/schemas';
import { createAction } from 'redux-actions';
import { fromJS } from 'immutable';
import { todoSchema } from '../constants/schemas';

const fetchActionCreator = createAction('FETCH_TODO');
const updateActionCreator = createAction('UPDATE_TODO');
const actionCreators = {
  'FETCH_TODO': (payload) => fetchActionCreator(fromJS(payload)),
  'UPDATE_TODO': (payload) => updateActionCreator(fromJS(payload)),
};

export function fetch() {
  return (dispatch, getState) => {
    return fetchAPI().then((data) => {
      const payload = normalize(
        data.toJS(),
        {
          todos: arrayOf(todoSchema),
        },
        { state: getState() }
      );
      return dispatch(actionCreators.FETCH_TODO(payload));
    });
  };
}

export function changeStatus(entityId, completed) {
  return (dispatch, getState) => {
    // サーバ経由を模擬
    return changeStatusAPI(entityId, completed, getState).then((data) => {
      const payload = normalize(
        data.toJS(),
        {
          todo: todoSchema,
        },
        { state: getState() }
      );
      return dispatch(actionCreators.UPDATE_TODO(fromJS(payload)));
    });
  };
}


function fetchAPI() {
  // サーバ経由を模擬
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        fromJS({
          todos: [{
            id: 1,
            text: 'Todo 其の一',
            created: 1472477710207,
            owner: {
              id: 'p101',
              name: 'Sansan太郎',
            },
          }, {
            id: 2,
            text: 'Todo 其ノ貮',
            status: 'completed',
            created: 1470806279000,
            owner: {
              id: 'p1',
              name: 'Shuhei Aoyama',
            },
          }, {
            id: 3,
            text: 'Todo 其の参',
            created: 1471670279000,
            owner: {
              id: 'p101',
              name: 'Sansan太郎',
            },
          }],
        })
      );
    }, 2000);
  });
}

function changeStatusAPI(entityId, completed, getState) {
  // サーバ経由を模擬
  const target = getState().entities.todos.get(entityId).complete(completed);
  return new Promise((resolve) => {
    resolve(
      fromJS({
        todo: target,
      })
    );
  });
}

