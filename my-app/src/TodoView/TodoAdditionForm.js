import React from 'react'
import { connect } from 'react-redux'

import { add } from '../../../state/todoItems'

class TodoAdditionForm extends React.Component {

  state = {
    incomingTodo: ''
  }

  handleChange = event => this.setState({
    incomingTodo: event.currentTarget.value
  })

  handleSubmit = event => {
    event.preventDefault()

    this.props.addTodoItem(this.state.incomingTodo)

    this.setState({
      incomingTodo: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.incomingTodo}
          onChange={this.handleChange}
        />
        <button>Add</button>
      </form>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    addTodoItem: todoItem => dispatch(add(todoItem))
  })
)(TodoAdditionForm)