import React, { Component } from 'react'
import MyNavBar from '../../components/MyNavBar'
import { getMyRentList } from '../../api/rent'
import HouseItem from '../../components/HouseItem'
import { Toast } from 'antd-mobile'

export default class Rent extends Component {
  constructor() {
    super()
    this.state = {
      houseList: null
    }
  }

  componentDidMount () {
    this.getMyRentListData()
  }

  getMyRentListData = async () => {
    Toast.loading('数据加载中...', 0)
    const { data } = await getMyRentList()
    Toast.hide()
    console.log('getMyRentList', data)
    this.setState({
      houseList: data.body
    })
  }

  render () {
    const { houseList } = this.state
    return (
      <div>
        <MyNavBar>我的出租列表</MyNavBar>
        {
          houseList && houseList.map(item => {
            return <HouseItem key={item.houseCode} {...item} />
          })
        }
      </div>
    )
  }
}
