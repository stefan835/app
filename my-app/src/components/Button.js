import React from 'react'

const Button = ({
                  buttonContent,
                  additionalClassName,
                  customHandlers,
                  itemId,
                  itemContent
                }) => {

  return (
    <button
      className={`btn-custom ${additionalClassName}`}
      onClick={customHandlers}
      data-item-id={itemId}
      data-item-content={itemContent}>
      {
        buttonContent
      }
    </button>
  )
};

export default Button