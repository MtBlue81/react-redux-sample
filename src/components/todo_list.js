import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import MyPropTypes from '../constants/prop_types';
import { fetch } from '../actions/todo';
import Todo from './todo';


export class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
    };
    this.fetched = this.fetched.bind(this);
  }

  componentDidMount() {
    this.setState({isFetching: true});
    this.props.fetch().then(this.fetched, this.fetched);
  }

  fetched() {
    this.setState({isFetching: false});
  }

  renderTodos() {
    return this.props.todos.map((todo, idx) => {
      return (
        <li key={`todo-${idx}`}>
          <Todo todo={todo}/>
        </li>
      );
    });
  }

  render() {
    return (
      <ul>
        {this.state.isFetching ? 'Now Loading...' : this.renderTodos()}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: MyPropTypes.listOf(PropTypes.string).isRequired,
  fetch: PropTypes.func,
};

TodoList.defaultProps = {
  fetch: () => Promise.resolve(),
};

function mapStateToProps(state) {
  const entities = state.entities.todos;
  const todos = state.todos.get('todos', List())
    .map((todoEntityId) => entities.get(todoEntityId))
    .sortBy((todo) => -1 * todo.created);
  return {todos};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetch,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
