/**
 * 赛选:过滤组件
 */



import React, { Component } from 'react'
import styles from './index.module.scss'
import { Flex } from 'antd-mobile'
import classNames from 'classnames'



export default class Filter extends Component {
  constructor() {
    super()
    this.state = {
      // 标题选中，（决定是否高亮显示）
      selectedTypeTitle: {
        area: false,
        mode: true,
        price: false,
        more: false
      },
      // 点击或是打开的类型
      openType: '',
    }
  }
  types = [
    {
      type: 'area',
      name: '区域'
    },
    {
      type: 'mode',
      name: '方式'
    },
    {
      type: 'price',
      name: '租金'
    },
    {
      type: 'more',
      name: '筛选'
    }
  ]

  // 渲染类型标题部分
  renderTypeTitle = () => {
    const { selectedTypeTitle } = this.state
    return <Flex className={styles.filterTitle}>
      {
        this.types.map(item => {
          const isSelect = selectedTypeTitle[item.type]
          return <Flex.Item key={item.type}>
            <span
              className={classNames(styles.dropdown, { [styles.selected]: isSelect })}
              onClick={() => this.clickType(item.type)}
            >
              <span>{item.name}</span>
              <i className="iconfont icon-arrow"></i>
            </span>
          </Flex.Item>
        })
      }
    </Flex >
  }
  // 点击设置选中状态
  clickType = type => {
    // console.log(type);
    this.setState({
      selectedTypeTitle: {
        [type]: true
      },
      openType: type
    })
  }

  cancelMask = () => {
    this.setState({
      selectedTypeTitle: {
        [this.state.openType]: false
      }
    }, () => {
      this.setState({
        openType: ''
      })
    })
  }

  // 渲染遮罩层
  renderMsk = () => {
    const { openType } = this.state
    const isShow = openType === 'area' || openType === 'mode' || openType === 'price'
    if (!isShow) return null
    return <div onClick={this.cancelMask} className={styles.mask}></div>
  }

  render () {
    return (
      <div className={styles.root}>
        {this.renderMsk()}
        <div className={styles.content}>{this.renderTypeTitle()}</div>
      </div>
    )
  }
}
