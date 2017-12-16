import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import { update, cancelEdit } from '../../../state/todoItems'

class TodoModal extends React.Component {

  state = {
    content: this.props.content
  }

  handleChange = event => this.setState({
    content: event.currentTarget.value
  })

  handleUpdateClick = event => this.props.updateTodoItem(
    this.props.itemId, this.state.content
  )

  handleCloseClick = event => this.props.cancelTodoItemEdit(this.props.itemId)

  render() {
    return (
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Edit todo item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleCloseClick}>Close</Button>
          <Button
            bsStyle="primary"
            onClick={this.handleUpdateClick}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    cancelTodoItemEdit: itemId => dispatch(cancelEdit(itemId)),
    updateTodoItem: (itemId, content) => dispatch(update(itemId, content)),
  })
)(TodoModal)