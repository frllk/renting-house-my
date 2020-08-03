/**
 * 固钉效果组件封装
 */

import React, { Component } from 'react'
import styles from './index.module.scss'

export default class Affix extends Component {

  placeholderRef = React.createRef()
  contentRef = React.createRef()

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll)
  }
  onScroll = () => {
    // 获取占位的div,离顶部屏幕的间距
    const { top } = this.placeholderRef.current.getBoundingClientRect()
    console.log('===================', top)
    if (top <= 0) {
      this.contentRef.current.classList.add(styles.fixed)
      this.placeholderRef.current.style.height = '40px'
    } else {
      this.contentRef.current.classList.remove(styles.fixed)
      this.placeholderRef.current.style.height = '0px'
    }
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  render () {
    return (
      <div>
        {/* 占位的div，刚开始高度为0 */}
        <div ref={this.placeholderRef}></div>
        {/* 内容的div */}
        <div ref={this.contentRef}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
