import React, { Component } from 'react'
import styles from './index.module.scss'
import { Flex, Toast } from 'antd-mobile'
import SearchBar from '../../components/SearchBar'
import { getCurrentCity } from '../../utils/city'
import Filter from '../../components/Filter'
import { getHouseList } from '../../api/houselist'
import { AutoSizer, List } from 'react-virtualized'
import HouseItem from '../../components/HouseItem'

export default class HouseList extends Component {
  constructor() {
    super()
    this.state = {
      cityName: '',
      count: 0, // 加载的总条数
      houseList: null // 房源列表
    }
  }

  // 过滤条件
  filter = {}

  async componentDidMount () {
    const { label, value } = await getCurrentCity()

    this.setState({
      cityName: label
    })

    // 查询房源列表
    this.id = value
    // 不带条件查询第一页
    this.getHouseListData()
  }

  // 查询房源列表
  getHouseListData = async () => {
    Toast.loading('数据加载中...', 0)
    const { data } = await getHouseList({ cityId: this.id, data: this.filter })
    Toast.hide()
    console.log('getHouseListData', data.body);

    if (data.body.count > 0) {
      Toast.info(`共查询到 ${data.body.count} 套房源`)
      this.setState({
        houseList: data.body.list,
        count: data.body.count
      })
    }

  }

  // 当筛选条件发生改变之后，发生请求
  onConditionChange = data => {
    // 处理区域或是地铁
    // areaKey: area、subway
    const areaKey = data.area[0]
    if (data.area.length >= 2 && data.area[1] !== 'null') {
      this.filter[areaKey] = data.area[2] === 'null' ? data.area[1] : data.area[2]
    } else {
      this.filter[areaKey] = null
    }

    // 处理mode
    if (data.mode.length > 0 && data.mode[0] !== 'null') {
      this.filter.rentType = data.mode[0]
    } else {
      this.filter.rentType = null
    }

    // 处理价格
    if (data.price.length > 0 && data.price[0] !== 'null') {
      this.filter.price = data.price[0]
    } else {
      this.filter.price = null
    }
    // 处理more
    if (data.more.length > 0) {
      this.filter.more = data.more.join(',')
    } else {
      this.filter.more = null
    }
    // console.log('filter', this.filter)
    this.getHouseListData()
  }

  // 渲染每一行
  rowRenderer = ({ key, index, style }) => {
    const data = this.state.houseList[index]
    if (!data) {
      console.log('------------------------------------------------');
      return (
        <div key={key} style={style}>
          <span className={styles.loading}></span>
        </div>
      )
    }
    return <HouseItem key={key} style={style} {...data} />
  }

  render () {
    const { cityName, houseList, count } = this.state
    return (
      <div className={styles.root}>
        <Flex className={styles.listHeader}>
          <i onClick={() => this.props.history.goBack()} className="iconfont icon-back"></i>
          {/* className:这里是传值  SearchBar组件内部进行处理 */}
          <SearchBar className={styles.mySearchBar} cityName={cityName} />
        </Flex>
        {/* 赛选过滤组件 */}
        <Filter onConditionChange={this.onConditionChange} />
        {houseList && (
          <AutoSizer>
            {({ height, width }) => (<List
              width={width}
              height={height}
              rowCount={count} // 如果是分页加载，必须是总条数
              rowHeight={120}
              rowRenderer={this.rowRenderer}
            />)}
          </AutoSizer>
        )}
      </div>
    )
  }
}
