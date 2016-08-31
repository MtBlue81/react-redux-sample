import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/todo_list';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = compose(
  applyMiddleware(thunk)
)(createStore)(reducers);

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('container')
);
