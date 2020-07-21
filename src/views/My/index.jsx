import React, { Component } from 'react'
import Styles from './index.module.css'

export default class My extends Component {
  render () {
    return (
      <div className={Styles.test}>
        我的
      </div>
    )
  }
}
