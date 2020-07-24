/**
 * 城市列表组件
 */
import React, { Component } from 'react'
import styles from './index.module.scss'
import MyNavBar from '../../components/MyNavBar'

export default class CityList extends Component {
  render () {
    return (
      <div>
        {/* 这么传会增加父子组件的耦合程度 */}
        {/* <MyNavBar history={this.props.history}>城市选择</MyNavBar> */}
        <MyNavBar>城市选择</MyNavBar>
      </div>
    )
  }
}
