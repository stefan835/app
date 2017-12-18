import React from 'react'
import {Button, Glyphicon} from 'react-bootstrap'

const ToBuyItem = ({
                     item,
                     handleRemoveClick,
                     handleEditClick,
                   }) => (
  <li key={item.id}>
    {
      item.content
    }
    <Button
      data-item-id={item.id}
      onClick={handleRemoveClick}
    >
      <Glyphicon glyph="remove"/>
    </Button>

    <Button
      data-item-id={item.id}
      data-item-content={item.content}
      onClick={handleEditClick}
    >
      <Glyphicon glyph="glyphicon glyphicon-edit"/>
    </Button>
  </li>
)

export default ToBuyItem