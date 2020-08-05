import React, { Component } from 'react'
import { Button, Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import {
  add, minus, addTodo, asyncAdd, asyncMinus, toggleTodo,
  setVisibilityFilter,
  VisibilityFilters,
  asyncSetName
} from '../store/ActionCreator'

const mapDispatchToProps = dispatch => {
  return {
    addCount: num => {
      dispatch(add(num))
    },
    minusCount: num => {
      dispatch(minus(num))
    },
    addCountAsync: num => {
      dispatch(asyncAdd(num))
    },
    minusCountAsync: num => {
      dispatch(asyncMinus(num))
    },
    setName: name => {
      dispatch(asyncSetName(name))
    }
  }
}

class Brother1 extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }
  addCount = () => {
    this.props.addCount(5)
  }
  minusCount = () => {
    // store.dispatch({ type: 'MINUS', payload: 2 })
    this.props.minusCount(2)
  }
  addCountAsync = () => {
    this.props.addCountAsync(5)
  }
  minusCountAsync = () => {
    this.props.minusCountAsync(2)
  }
  setName = () => {
    this.props.setName(this.state.name)
  }

  render () {
    const { name } = this.state
    return (
      <div>
        Brother1
        <br />
        <br />
        <Flex>
          <Button onClick={this.addCount} size="small" type="primary">+</Button>
            &nbsp;&nbsp;
          <Button onClick={this.addCountAsync} size="small" type="primary">async +</Button>
            &nbsp;&nbsp;
          <Button onClick={this.minusCount} size="small" type="primary">-</Button>
            &nbsp;&nbsp;
          <Button onClick={this.minusCountAsync} size="small" type="primary">async -</Button>
        </Flex>
        <br />
        <Flex>
          <input type="text" value={name} onChange={(e) => {
            this.setState({
              name: e.target.value
            })
          }} />
          &nbsp;&nbsp;
          <button onClick={this.setName}>asyncSetName</button>
        </Flex>
      </div>
    )
  }
}
export default connect(null, mapDispatchToProps)(Brother1)