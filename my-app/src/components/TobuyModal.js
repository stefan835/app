import React from 'react'
import {Modal, Button} from 'react-bootstrap'

const TobuyModal = ({
                      content,
                      handleChange,
                      handleCloseClick,
                      handleUpdateClick
                    }) => (
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Edit tobuy item</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <input
        type="text"
        value={content}
        onChange={handleChange}
      />
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={handleCloseClick}>Close</Button>
      <Button
        bsStyle="primary"
        onClick={handleUpdateClick}
      >
        Save changes
      </Button>
    </Modal.Footer>

  </Modal.Dialog>
)

export default TobuyModal