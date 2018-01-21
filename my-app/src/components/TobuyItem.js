import React from 'react'
import {button, Glyphicon} from 'react-bootstrap'

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
          <button
            className={'btn-custom btn-icon fav-added'}
            data-item-id={item.id}
            onClick={handleUnmarkFavoriteClick}
          >
            <Glyphicon glyph="glyphicon glyphicon-heart"/>
          </button>
          :
          <button

            className={'btn-custom btn-icon'}
            data-item-id={item.id}
            onClick={handleMarkFavoriteClick}
          >
            <Glyphicon glyph="glyphicon glyphicon-heart"/>
          </button>
      }
      <button
        className={'btn-custom btn-icon'}
        data-item-id={item.id}
        data-item-content={item.content}
        onClick={handleEditClick}
      >
        <Glyphicon glyph="glyphicon glyphicon-edit"/>
      </button>
      <button
        className={'btn-custom btn-icon'}
        data-item-id={item.id}
        onClick={handleRemoveClick}
      >
        <Glyphicon glyph="remove"/>
      </button>
    </div>
  </li>
)

export default ToBuyItem