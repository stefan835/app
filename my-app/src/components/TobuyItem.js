import React from 'react'
import {Button, Glyphicon} from 'react-bootstrap'

const ToBuyItem = ({
                     item,
                     handleRemoveClick,
                     handleEditClick,
                     handleMarkFavoriteClick,
                     handleUnmarkFavoriteClick
                   }) => (
  <li key={item.id}>
    {
      item.content
    }
    {
      item.favorite ?
        <Button
          data-item-id={item.id}
          onClick={handleUnmarkFavoriteClick}
        >
          <Glyphicon glyph="glyphicon glyphicon-heart" style={{color: 'red'}}/>
        </Button>
        :
        <Button
          data-item-id={item.id}
          onClick={handleMarkFavoriteClick}
        >
          <Glyphicon glyph="glyphicon glyphicon-heart"/>
        </Button>
    }
    <Button
      data-item-id={item.id}
      data-item-content={item.content}
      onClick={handleEditClick}
    >
      <Glyphicon glyph="glyphicon glyphicon-edit"/>
    </Button>
    <Button
      data-item-id={item.id}
      onClick={handleRemoveClick}
    >
      <Glyphicon glyph="remove"/>
    </Button>

  </li>
)

export default ToBuyItem