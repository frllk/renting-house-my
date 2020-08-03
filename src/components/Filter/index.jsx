/**
 * 赛选:过滤组件
 */
import React, { Component } from 'react'
import styles from './index.module.scss'
import { Flex, PickerView } from 'antd-mobile'
import classNames from 'classnames'
import { getHouseCondition } from '../../api/filter'
import { getCurrentCity } from '../../utils/city'
import FilterFooter from '../FilterFooter'
import { Spring } from 'react-spring/renderprops'

export default class Filter extends Component {
  constructor() {
    super()
    this.state = {
      // 标题选中，（决定是否高亮显示）
      selectedTypeTitle: {
        area: false,
        mode: false,
        price: false,
        more: false
      },
      // 最终的数据,并且该数据将来要传递给父组件(HouseList)
      // 只有当我们点击了确定之后才需要更改这个selectedValue的数据,其他情况下不允许改动
      selectedValue: {
        area: ['area', 'null'],
        mode: ['null'],
        price: ['null'],
        more: [],
      },
      // 为区域/方式/租金服务的
      tempPickerViewValue: {
        area: ['area', 'null'],
        mode: ['null'],
        price: ['null'],
      },
      // 为筛选服务的
      tempMoreValue: [],
      // 点击或是打开的类型
      openType: '',
      houseCondition: null, // 房屋筛选条件
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

  // 处理高亮=>最终是要看 selectedValue 选中的值,来决定我们的高亮状态
  // 产品经理此处的约定就是  只要selectValue它的值不是默认值,那就高亮
  dealWithHighLight = () => {
    const { selectedValue } = this.state
    let tempObj = {}
    Object.keys(selectedValue).forEach(item => {
      if (item === 'area') {
        tempObj['area'] = selectedValue.area.length >= 2 && selectedValue.area[1] !== 'null'
      } else if (item === 'mode') {
        tempObj['mode'] = selectedValue.mode.length > 0 && selectedValue.mode[0] !== 'null'
      } else if (item === 'price') {
        tempObj['price'] = selectedValue.price.length > 0 && selectedValue.price[0] !== 'null'
      } else if (item === 'more') {
        tempObj['more'] = selectedValue.more.length > 0
      }
    })

    this.setState({
      selectedTypeTitle: tempObj
    })
  }

  // 获取房屋筛选条件
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
    const { selectedTypeTitle } = this.state
    this.setState({
      selectedTypeTitle: {
        ...selectedTypeTitle,
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
      }, () => {
        this.dealWithHighLight()
      })
    })
  }

  // 渲染遮罩层
  renderMsk = () => {
    const { openType } = this.state
    const isShow = openType === 'area' || openType === 'mode' || openType === 'price'
    /* if (!isShow) return null
    return <div onClick={this.cancelMask} className={styles.mask}></div> */
    return <Spring
      config={{ duration: 250 }}
      to={{ opacity: isShow ? 1 : 0 }}>
      {props => {
        if (props.opacity === 0) {
          return null
        }
        return <div onClick={this.cancelMask} style={{ opacity: props.opacity }} className={styles.mask}></div>
      }}
    </Spring>
  }

  // PickerView(受控组件) 选中后的回调 
  onChange = value => {
    // console.log(value);
    const { tempPickerViewValue, openType } = this.state
    // 这样处理之后会有一个问题? => 选择之后会回到初始状态 => 因为更改了模型数据,进行重新渲染,PickerView没有指定value值,默认选择第一个
    this.setState({
      tempPickerViewValue: {
        ...tempPickerViewValue,
        [openType]: value
      }
    })
  }

  // 渲染PickerView
  renderPickerView = () => {
    const { openType, houseCondition: { area, subway, rentType, price }, tempPickerViewValue, selectedValue } = this.state
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
        break;
      case 'price':
        data = price
        cols = 1
        break;
      default:
        break;
    }

    // 取出设置好的值,然后设置给 PickerView 的value即可
    // 解决PickerView组件一选择就弹回的问题
    const value = tempPickerViewValue[openType]

    return <div>
      <PickerView data={data} cols={cols} value={value} onChange={this.onChange} />
      {/* 渲染底部 */}
      <FilterFooter
        onCancel={
          () => {
            this.setState({
              openType: ''
            })
          }
        }
        onOk={
          () => {
            this.setState({
              selectedValue: {
                ...selectedValue,
                [openType]: tempPickerViewValue[openType]
              }
            },
              () => {
                // 把我们最终的值传递给父组件
                this.props.onConditionChange(this.state.selectedValue)

                this.setState({
                  openType: ''
                })
              }, () => {
                // 对状态做最后一次高亮的处理
                this.dealWithHighLight()
              })
          }
        }
      />
    </div>
  }

  // 渲染MoreView
  renderMoreView = () => {
    // 户型、朝向、楼层、房屋亮点
    const { houseCondition: { roomType, oriented, floor, characteristic }, tempMoreValue, selectedValue } = this.state
    return (
      <div className={styles.filterMore}>
        <div className={styles.filterMoreMask} onClick={() => this.cancelMask()}></div>
        <div className={styles.tags}>
          <dl className={styles.dl}>
            {this.renderEveryItem('户型', roomType)}
            {this.renderEveryItem('朝向', oriented)}
            {this.renderEveryItem('楼层', floor)}
            {this.renderEveryItem('房屋亮点', characteristic)}
          </dl>
          <FilterFooter className={styles.filterMoreFooter}
            onCancel={() => this.setState({ tempMoreValue: [] })}
            onOk={() => {
              this.setState({
                selectedValue: { ...selectedValue, more: tempMoreValue }
              }, () => {
                this.setState({
                  openType: ''
                }, () => {
                  this.dealWithHighLight()
                  // 把我们最终的值传递给父组件
                  this.props.onConditionChange(this.state.selectedValue)
                })
              })
            }}
            cancelText="清除" />
        </div>
      </div>
    )
  }

  // 渲染MoreView中每一项内容 => 户型、朝向、楼层、房屋亮点
  renderEveryItem = (title, data) => {
    const { tempMoreValue } = this.state
    return (
      <>
        <dt className={styles.dt}>{title}</dt>
        <dd className={styles.dd}>
          {
            data.map(item => <span key={item.value} onClick={() => this.toggleSelect(item.value)} className={classNames(styles.tag, { [styles.tagActive]: tempMoreValue.includes(item.value) })}>{item.label}</span>)
          }
        </dd>
      </>
    )
  }

  // 点击切换设置高亮状态
  toggleSelect = value => {
    let oldTempMoreValue = this.state.tempMoreValue
    if (oldTempMoreValue.includes(value)) {
      // 之前有
      oldTempMoreValue = oldTempMoreValue.filter(item => item !== value)
    } else {
      // 之前没有
      oldTempMoreValue.push(value)
    }
    this.setState({
      tempMoreValue: oldTempMoreValue
    })
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
          {/* 渲染右边的MoreView */}
          {
            houseCondition && openType === 'more' && this.renderMoreView()
          }
        </div>
      </div>
    )
  }
}
