import React from 'react'
import {connect} from 'react-redux'

import {load, clear} from '../state/tobuy'

import TobuyAdditionForm from '../TobuyAdditionForm'
import TobuyItem from '../TobuyItem'
import TobuyModal from '../TobuyModal'
import Button from '../Button'
import '../Tobuy.css'
import database from "../../database";


class TobuyView extends React.Component {

  state = {
    showModal: false,
    currentEditId: null,
    currentEditContent: null,
  }

  dataFetch = () => {
    return database
      .ref('/items')
      .once('value')
      .then(
        snapshot => {
          this.props.loadTobuyItems(snapshot.val() || {})
        }
      ).catch((error) => {
        console.log(error);
      });
  }

  componentWillMount() {
    this.dataFetch()
  }

  handleEditChange = event => this.setState({
    currentEditContent: event.target.value
  })

  handleUpdate = () => {

    database.ref(`/items/${this.state.currentEditId}/content`).set(this.state.currentEditContent)
    this.dataFetch()

    this.setState({
      showModal: false
    })
  }

  handleRemoveClick = event => {
    const itemId = event.currentTarget.dataset.itemId
    database.ref(`/items/${itemId}`).remove();
    this.dataFetch()
  }

  handleMarkFavoriteClick = event => {
    const itemId = event.currentTarget.dataset.itemId
    database.ref(`/items/${itemId}/favorite`).set(true)
    this.dataFetch()
  }

  handleUnmarkFavoriteClick = event => {
    const itemId = event.currentTarget.dataset.itemId
    database.ref(`/items/${itemId}/favorite`).set(false)
    this.dataFetch()
  }

  handleAddFavorites = () => {
    this.props.tobuyFavorites.map((favItem) => {
      return this.props.addTobuyItem(favItem, true)
    })
  }

  handleEditClick = event => {
    const itemId = event.currentTarget.dataset.itemId
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
  handleClearList = () => {
    this.props.clearTobuyItems()
  }

  render() {
    return (
      <div className={'container tobuy--container'}>
        <div className={'tobuy--header'}>
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
        </div>
        <div className={'tobuy--container__buttons'}>
          <Button
            buttonContent={'Dodaj ulubione'}
            additionalClassName={'btn-blue'}
            customHandlers={this.handleAddFavorites}
          />
          <Button
            buttonContent={'Wyczyśc'}
            additionalClassName={'btn-red'}
            customHandlers={this.handleClearList}
          />
        </div>
        <ul className='tobuy--list'>
          {
            this.props.tobuyItems ?
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
              :
              null
          }
        </ul>
        <div className={'tobuy--footer'}>
          Copyrights Ⓒ 2018
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    tobuyItems: state.tobuy.tobuyItems,
    tobuyFavorites: state.tobuy.tobuyFavorites
  }),
  dispatch => ({
    loadTobuyItems: items => dispatch(load(items)),
    clearTobuyItems: () => dispatch(clear()),
  })
)(TobuyView)