/**
 * 赛选:过滤组件
 */
import React, { Component } from 'react'
import styles from './index.module.scss'
import { Flex, PickerView } from 'antd-mobile'
import classNames from 'classnames'
import { getHouseCondition } from '../../api/filter'
import { getCurrentCity } from '../../utils/city'


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
      houseCondition: null // 房屋筛选条件
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

  componentDidMount () {
    this.getHouseConditionData()
  }

  getHouseConditionData = async () => {
    const { value } = await getCurrentCity()
    const { data } = await getHouseCondition(value)
    this.setState({
      houseCondition: data.body
    })
  }
  // 渲染类型标题部分
  renderTypeTitle = () => {
    const { selectedTypeTitle } = this.state
    return <Flex className={styles.filterTitle}>
      {
        this.types.map(item => {
          // 决定遍历到的item这一项是否高亮显示
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

  // 取消遮罩
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

  // 渲染PickerView
  renderPickerView = () => {
    const { openType, houseCondition: { area, subway, rentType, price } } = this.state
    let data = null
    let cols = 3
    switch (openType) {
      case 'area':
        data = [area, subway]
        cols = 3
        break;
      case 'mode':
        data = rentType
        cols = 1
      case 'price':
        data = price
        cols = 1
      default:
        break;
    }

    return <div>
      <PickerView
        data={data}
        cols={cols}
      />
    </div>
  }

  render () {
    const { houseCondition, openType } = this.state
    return (
      <div className={styles.root}>
        {this.renderMsk()}
        <div className={styles.content}>
          {/* 渲染标题 */}
          {this.renderTypeTitle()}
          {/* 渲染PickerView */}
          {
            houseCondition && (openType === 'area' || openType === 'price' || openType === 'mode') && this.renderPickerView()
          }
        </div>
      </div>
    )
  }
}
