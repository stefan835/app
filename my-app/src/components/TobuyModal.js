import React from 'react'
import {Modal} from 'react-bootstrap'

import Button from './Button'

const TobuyModal = ({
                      content,
                      handleChange,
                      handleCloseClick,
                      handleUpdateClick
                    }) => (
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Edytuj produkt</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <input
        type="text"
        value={content}
        onChange={handleChange}
      />
    </Modal.Body>

    <Modal.Footer>
      <Button
        customHandlers={handleCloseClick}
        buttonContent={'Zamknij'}
        additionalClassName={'btn-red'}
      />
      <Button
        customHandlers={handleUpdateClick}
        buttonContent={'Zapisz zmiany'}
        additionalClassName={'btn-blue'}
      />
    </Modal.Footer>

  </Modal.Dialog>
)

export default TobuyModal