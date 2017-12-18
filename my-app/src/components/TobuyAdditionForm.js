import React from 'react'
import {connect} from 'react-redux'

import {add} from './state/tobuy'

class TobuyAdditionForm extends React.Component {

  state = {
    incomingTobuy: ''
  }

  handleChange = event => this.setState({
    incomingTobuy: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault()

    this.props.addTobuyItem(this.state.incomingTobuy)

    this.setState({
      incomingTobuy: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          required
          value={this.state.incomingTobuy}
          onChange={this.handleChange}
        />
        <button>Dodaj</button>
      </form>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    addTobuyItem: TobuyItem => dispatch(add(TobuyItem))
  })
)(TobuyAdditionForm)