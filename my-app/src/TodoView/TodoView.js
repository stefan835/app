import React from 'react'

import TodoAdditionForm from './TodoAdditionForm'
import TodoItems from './TodoItems'

const TodoView = () => (
  <div>
    <h1>Todo</h1>

    <TodoAdditionForm/>

    <TodoItems/>
  </div>
)

export default TodoView