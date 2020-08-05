import React, { Component } from 'react'
import { Button, Flex } from 'antd-mobile'
import store from '../store'
import {
  add, minus, addTodo, asyncAdd, asyncMinus, toggleTodo,
  setVisibilityFilter,
  VisibilityFilters,
  asyncSetName
} from '../store/ActionCreator'

// 打印初始状态
console.log(store.getState())

export default class Brother1 extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }
  addCount = () => {
    // 触发加操作的action，action是一个对象，必须要有的属性是type，  payload是载荷，代表参数
    // store.dispatch({ type: 'ADD', payload: 5 })
    store.dispatch(add(5))
  }
  minusCount = () => {
    // store.dispatch({ type: 'MINUS', payload: 2 })
    store.dispatch(minus(2))
  }
  addCountAsync = () => {
    store.dispatch(asyncAdd(5))
  }
  minusCountAsync = () => {
    store.dispatch(asyncMinus(2))
  }
  addTodo = () => {
    // 发起一系列 action
    store.dispatch(addTodo('Learn about actions'))
    store.dispatch(addTodo('Learn about reducers'))
    store.dispatch(addTodo('Learn about store'))
    // store.dispatch(toggleTodo(0))
    // store.dispatch(toggleTodo(1))
    // store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
  }


  setName = () => {
    store.dispatch(asyncSetName(this.state.name))
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
        <br />
        <Flex>
          <Button onClick={this.addTodo} size="small" type="primary">addTodo</Button>
        </Flex>
      </div>
    )
  }
}
