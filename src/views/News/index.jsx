import React, { Component } from 'react'
import Styles from './index.module.css'
import { Button } from 'antd-mobile';

export default class News extends Component {
  render () {
    return (
      <div className={Styles.test}>
        <Button type="warning">warning</Button>
        <Button type="ghost" className="am-button-borderfix">ghost disabled</Button>
      </div>
    )
  }
}
