import React from 'react'
import {connect} from 'react-redux'

import {load} from './state/tobuy'
import Button from './Button'
import database from "../database";

class TobuyAdditionForm extends React.Component {

  state = {
    incomingTobuy: ''
  }

  handleChange = event => this.setState({
    incomingTobuy: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault();
    database.ref('/items').push({
      content: this.state.incomingTobuy,
      favorite: false
    })
    this.dataFetch();
    this.setState({
      incomingTobuy: ''
    })
  }

  dataFetch = () => {
    return database
      .ref('/')
      .once('value')
      .then(
        snapshot => {
          console.log(snapshot.val())
          this.props.loadTobuyItems(snapshot.val() || {})
        }
      ).catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <form className={'tobuy--addition-form'} onSubmit={this.handleSubmit}>
        <input
          type="text"
          required
          value={this.state.incomingTobuy}
          onChange={this.handleChange}
        />
        <Button
          buttonContent={<i className="material-icons icon-add">add_box</i>}
          additionalClassName={'btn-icon'}
        />
      </form>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    loadTobuyItems: items => dispatch(load(items)),
  })
)(TobuyAdditionForm)