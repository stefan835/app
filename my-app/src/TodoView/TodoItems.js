import React from 'react'
import { connect } from 'react-redux'

import TodoItem from './TodoItem'

const TodoItems = props => (
  <ul>
    {
      props.todoItems.map(
        item => (
          <TodoItem
            key={item.id}
            item={item}
          />
        )
      )
    }
  </ul>
)

export default connect(
  state => ({
    todoItems: state.todoItems
  })
)(TodoItems)