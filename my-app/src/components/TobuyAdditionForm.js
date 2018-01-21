import React from 'react'
import {connect} from 'react-redux'
import {Glyphicon} from 'react-bootstrap'

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
      <form className={'tobuy--addition-form'} onSubmit={this.handleSubmit}>
        <input
          type="text"
          required
          value={this.state.incomingTobuy}
          onChange={this.handleChange}
        />
        <button className={'btn-custom btn-icon'}>
          <Glyphicon glyph="glyphicon glyphicon-plus"/>

        </button>
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