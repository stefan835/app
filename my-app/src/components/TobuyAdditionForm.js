import React from 'react'
import {connect} from 'react-redux'

import {add} from './state/tobuy'
import Button from './Button'

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
        <Button
          buttonContent={<i className="material-icons icon-add">add_box</i>}
          additionalClassName={'btn-icon'}
        />
      </form>
    )
  }
}

export default connect(
  state => ({
    tobuyItems: state.tobuy.tobuyItems
  }),
  dispatch => ({
    addTobuyItem: TobuyItem => dispatch(add(TobuyItem))
  })
)(TobuyAdditionForm)