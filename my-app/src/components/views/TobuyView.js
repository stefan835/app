import React from 'react'
import {connect} from 'react-redux'

import {remove, update} from '../state/tobuy'

import TobuyAdditionForm from '../TobuyAdditionForm'
import TobuyItem from '../TobuyItem'
import TobuyModal from '../TobuyModal'
import Dragula from 'react-dragula';


class TobuyView extends React.Component {

  state = {
    showModal: false,
    currentEditId: null,
    currentEditContent: null
  }

  handleEditChange = event => this.setState({
    currentEditContent: event.target.value
  })

  handleUpdate = event => {
    this.props.updateTobuyItem(this.state.currentEditId, this.state.currentEditContent)

    this.setState({
      showModal: false
    })
  }

  handleRemoveClick = event => {
    const itemId = parseInt(event.currentTarget.dataset.itemId, 10)
    this.props.removeTobuyItem(itemId)
  }

  handleEditClick = event => {
    const itemId = parseInt(event.currentTarget.dataset.itemId, 10)
    this.setState({
      showModal: true,
      currentEditId: itemId,
      currentEditContent: event.currentTarget.dataset.itemContent
    })
  }

  handleModalCloseClick = event => {
    this.setState({
      showModal: false,
      currentEditId: null
    })
  }

  render() {
    return (
      <div>
        <h1>Lista zakupów</h1>

        <TobuyAdditionForm/>
        {
          this.state.showModal ?
            <TobuyModal
              content={this.state.currentEditContent}
              handleChange={this.handleEditChange}
              handleCloseClick={this.handleModalCloseClick}
              handleUpdateClick={this.handleUpdate}
            /> : null
        }

        <ul className='container' ref={this.dragulaDecorator}>
          {
            this.props.tobuyItems.map(
              item => (
                <TobuyItem
                  key={item.id}
                  item={item}
                  handleRemoveClick={this.handleRemoveClick}
                  handleEditClick={this.handleEditClick}
                />
              )
            )
          }
        </ul>

      </div>
    )
  }

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {};
      Dragula([componentBackingInstance], options);
    }
  };
}


export default connect(
  state => ({
    tobuyItems: state.tobuy.tobuyItems
  }),
  dispatch => ({
    updateTobuyItem: (itemId, content) => dispatch(update(itemId, content)),
    removeTobuyItem: itemId => dispatch(remove(itemId)),
  })
)(TobuyView)