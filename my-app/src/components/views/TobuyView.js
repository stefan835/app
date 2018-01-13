import React from 'react'
import {connect} from 'react-redux'

import {remove, update, mark, unmark, add} from '../state/tobuy'

import TobuyAdditionForm from '../TobuyAdditionForm'
import TobuyItem from '../TobuyItem'
import TobuyModal from '../TobuyModal'
import Dragula from 'react-dragula';
import {Button} from "react-bootstrap";


class TobuyView extends React.Component {

  state = {
    showModal: false,
    currentEditId: null,
    currentEditContent: null,
  }

  handleEditChange = event => this.setState({
    currentEditContent: event.target.value
  })

  handleUpdate = () => {
    this.props.updateTobuyItem(this.state.currentEditId, this.state.currentEditContent)

    this.setState({
      showModal: false
    })
  }

  handleRemoveClick = event => {
    const itemId = parseInt(event.currentTarget.dataset.itemId, 10)
    this.props.removeTobuyItem(itemId)
  }

  handleMarkFavoriteClick = event => {
    const itemId = parseInt(event.currentTarget.dataset.itemId, 10)
    this.props.markTobuyItem(itemId)
  }

  handleUnmarkFavoriteClick = event => {
    const itemId = parseInt(event.currentTarget.dataset.itemId, 10)
    this.props.unmarkTobuyItem(itemId)
  }

  handleAddFavorites = () => {
    this.props.tobuyFavorites.map((favItem) => {
      return this.props.addTobuyItem(favItem, true)
    })
  }

  handleEditClick = event => {
    const itemId = parseInt(event.currentTarget.dataset.itemId, 10)
    this.setState({
      showModal: true,
      currentEditId: itemId,
      currentEditContent: event.currentTarget.dataset.itemContent
    })
  }

  handleModalCloseClick = () => {
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
        <Button onClick={this.handleAddFavorites}>Dodaj ulubione do listy</Button>
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
                  handleMarkFavoriteClick={this.handleMarkFavoriteClick}
                  handleUnmarkFavoriteClick={this.handleUnmarkFavoriteClick}
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
    tobuyItems: state.tobuy.tobuyItems,
    tobuyFavorites: state.tobuy.tobuyFavorites
  }),
  dispatch => ({
    addTobuyItem: (tobuyItem, isFav) => dispatch(add(tobuyItem, isFav)),
    updateTobuyItem: (itemId, content) => dispatch(update(itemId, content)),
    removeTobuyItem: itemId => dispatch(remove(itemId)),
    markTobuyItem: itemId => dispatch(mark(itemId)),
    unmarkTobuyItem: itemId => dispatch(unmark(itemId)),
  })
)(TobuyView)