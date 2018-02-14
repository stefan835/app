import React from 'react'

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
            buttonContent={<i className="material-icons">favorite</i>}
            additionalClassName={'btn-icon fav-added'}
            itemId={item.id}
          />
          :
          <Button
            customHandlers={handleMarkFavoriteClick}
            buttonContent={<i className="material-icons">favorite_border</i>}
            additionalClassName={'btn-icon'}
            itemId={item.id}
          />
      }
      <Button
        customHandlers={handleEditClick}
        buttonContent={<i className="material-icons">mode_edit</i>}
        additionalClassName={'btn-icon'}
        itemId={item.id}
        itemContent={item.content}
      />
      <Button
        customHandlers={handleRemoveClick}
        buttonContent={<i className="material-icons">delete_forever</i>}
        additionalClassName={'btn-icon'}
        itemId={item.id}
        itemContent={item.content}
      />
    </div>
  </li>
)

export default ToBuyItem