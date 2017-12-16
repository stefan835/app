import React from 'react'
import { connect } from 'react-redux'
import { Button, Glyphicon } from 'react-bootstrap'

import { remove, done, undone, moveUp, moveDown, edit } from '../../../state/todoItems'
import { getItemId } from '../../_utils'

import TodoModal from './TodoModal'

const TodoItem = ({
                    item,
                    handleUndoneClick,
                    handleDoneClick,
                    handleRemoveClick,
                    handleEditClick,
                    handleMoveUpClick,
                    handleMoveDownClick
                  }) => (
  <li key={item.id}>
    {
      item.inEdit && <TodoModal itemId={item.id} content={item.content}/>
    }
    {
      item.done ?
        <del>{item.content}</del> :
        item.content
    }
    {
      [
        [handleUndoneClick, null, <Glyphicon glyph="ok" style={{ color: 'green' }}/>, item => item.done],
        [handleDoneClick, null, <Glyphicon glyph="ok" style={{ color: 'red' }}/>, item => !item.done],
        [handleRemoveClick, 'Remove', <Glyphicon glyph="remove"/>],
        [handleEditClick, 'Edit'],
        [handleMoveUpClick, 'Move up'],
        [handleMoveDownClick, 'Move down']
      ].map(
        ([onClick, label, icon, getVisible = () => true], index) => (
          getVisible(item) ?
            <Button
              key={index}
              data-item-id={item.id}
              onClick={onClick}
            >
              {icon} {label}
            </Button> : null
        )
      )
    }
  </li>
)

const h = (dispatch, handler) => event => dispatch(handler(getItemId(event)))

export default connect(
  null,
  dispatch => ({
    handleMoveUpClick: h(dispatch, moveUp),
    handleMoveDownClick: h(dispatch, moveDown),
    handleRemoveClick: h(dispatch, remove),
    handleDoneClick: h(dispatch, done),
    handleUndoneClick: h(dispatch, undone),
    handleEditClick: h(dispatch, edit)
  })
)(TodoItem)