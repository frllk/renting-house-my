import React, { Component } from 'react'
import store from '../store'


export default class Brother2 extends Component {
  constructor() {
    super()
    // 构造器只执行一次  需要手动订阅更新
    this.state = {
      count: store.getState().count,
      userName: store.getState().user
    }
  }
  componentDidMount () {
    // 手动订阅更新
    this.unsubscribe = store.subscribe(() => {
      // console.log('--------------', store.getState())
      this.setState({
        count: store.getState().count,
        userName: store.getState().user
      })
    })
  }

  componentWillUnmount () {
    if (this.unsubscribe)
      this.unsubscribe()
  }

  render () {
    const { count, userName } = this.state
    return (
      <div>
        Brother2
        <br />
        <br />
        仓库中的新值---{count}---{userName}
        <p>todo：</p>
      </div>
    )
  }
}
