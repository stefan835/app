import React from 'react'
import {Glyphicon} from 'react-bootstrap'

import Button from './Button'

const ToBuyItem = ({
                     item,
                     handleRemoveClick,
                     handleEditClick,
                     handleMarkFavoriteClick,
                     handleUnmarkFavoriteClick
                   }) => (
  <li className={'tobuy--list-item'} key={item.id}>
    <div className={'tobuy--list-item__content'}>
      {
        item.content
      }
    </div>
    <div className={'tobuy--list-item__buttons'}>
      {
        item.favorite ?
          <Button
            customHandlers={handleUnmarkFavoriteClick}
            buttonContent={<Glyphicon glyph="glyphicon glyphicon-heart"/>}
            additionalClassName={'btn-icon fav-added'}
            itemId={item.id}
          />
          :
          <Button
            customHandlers={handleMarkFavoriteClick}
            buttonContent={<Glyphicon glyph="glyphicon glyphicon-heart"/>}
            additionalClassName={'btn-icon'}
            itemId={item.id}
          />
      }
      <Button
        customHandlers={handleEditClick}
        buttonContent={<Glyphicon glyph="glyphicon glyphicon-edit"/>}
        additionalClassName={'btn-icon'}
        itemId={item.id}
        itemContent={item.content}
      />
      <Button
        customHandlers={handleRemoveClick}
        buttonContent={<Glyphicon glyph="remove"/>}
        additionalClassName={'btn-icon'}
        itemId={item.id}
        itemContent={item.content}
      />
    </div>
  </li>
)

export default ToBuyItem