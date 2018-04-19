import React from 'react'
import {connect} from 'react-redux'

import {mark, unmark, load} from '../state/tobuy'

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
    favoriteItems: null
  }

  dataFetch = () => {
    return database
      .ref('/')
      .once('value')
      .then(
        snapshot => {
          this.props.loadTobuyItems(snapshot.val() || {})
          this.setState({
            favoriteItems: snapshot.val().favoriteItems ? snapshot.val().favoriteItems.items.content : []
          })
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
    event.currentTarget.parentElement.parentElement.classList.add('fadeOut')
    const itemId = event.currentTarget.dataset.itemId
    database.ref(`/items/${itemId}`).remove();
    this.dataFetch()
  }

  handleMarkFavoriteClick = event => {
    const itemId = event.currentTarget.dataset.itemId
    this.state.favoriteItems.push(event.currentTarget.dataset.itemContent)
    database.ref(`/items/${itemId}/favorite`).set(true)
    database.ref(`/favoriteItems/items/content`).set(this.state.favoriteItems)
    this.dataFetch();
  }

  handleUnmarkFavoriteClick = event => {
    const itemId = event.currentTarget.dataset.itemId
    this.state.favoriteItems = this.state.favoriteItems.filter(favItem => {
      return favItem !== event.currentTarget.dataset.itemContent
    })
    database.ref(`/items/${itemId}/favorite`).set(false)
    database.ref(`/favoriteItems/items/content`).set(this.state.favoriteItems)
    this.dataFetch()
  }

  handleAddFavorites = () => {
    this.state.favoriteItems.map((favItem) => {
      return database.ref('/items').push({
        content: favItem,
        favorite: true
      })
    })
    this.dataFetch();
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
    database.ref(`/items/`).set(null)
    this.dataFetch()
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
            additionalClassName={'btn-confirm'}
            customHandlers={this.handleAddFavorites}
          />
          <Button
            buttonContent={'Wyczyść'}
            additionalClassName={'btn-decline'}
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
    markTobuyItem: itemId => dispatch(mark(itemId)),
    unmarkTobuyItem: itemId => dispatch(unmark(itemId)),
    loadTobuyItems: data => dispatch(load(data)),
  })
)(TobuyView)