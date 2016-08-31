import React, { Component, PropTypes } from 'react';
import MyPropTypes from '../constants/prop_types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeStatus } from '../actions/todo';


export class Todo extends Component {

  constructor() {
    super();
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onChangeStatus({target}) {
    this.props.changeStatus(this.props.todo.toEntityId(), target.checked);
  }

  get createdDate() {
    const date = new Date(this.props.todo.created)
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  render() {
    const {todo, owner} = this.props;
    return (
      <div>
        <input type='checkbox' checked={todo.isCompleted} onChange={this.onChangeStatus}/>
        <span>{todo.text}</span>{':'}<span>{owner.name}</span><span>{this.createdDate}</span>
      </div>
    );
  }
}

Todo.propTypes = {
  todo: MyPropTypes.todo.isRequired,
  owner: MyPropTypes.person.isRequired,
  changeStatus: PropTypes.func,
};

Todo.defaultProps = {
  changeStatus: () => Promise.resolve(),
};

function mapStateToProps(state, _ownProps) {
  const people = state.entities.people;
  return {
    owner: people.get(_ownProps.todo.owner),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeStatus,  // その他 update, deleteなど
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
