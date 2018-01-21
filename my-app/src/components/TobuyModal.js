import React from 'react'
import {Modal} from 'react-bootstrap'

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
      <button className={'btn-custom btn-red'} onClick={handleCloseClick}>Zamknij</button>
      <button className={'btn-custom btn-blue'} onClick={handleUpdateClick}>Zapisz zmiany</button>
    </Modal.Footer>

  </Modal.Dialog>
)

export default TobuyModal