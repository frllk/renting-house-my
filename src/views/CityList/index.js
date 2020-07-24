/**
 * 城市列表组件
 */
import React, { Component } from 'react'
import styles from './index.module.scss'
import MyNavBar from '../../components/MyNavBar'
import { getCityList, getHotCityList } from '../../api/city'
import { getCurrentCity } from '../../utils/city'
import { Grid } from 'antd-mobile'

export default class CityList extends Component {

  constructor() {
    super()
    this.state = {
      cityListObj: null, // 左侧的城市列表对象
      cityListIndex: null // 右侧的城市索引数组
    }
  }

  componentDidMount () {
    this.dealWithListData()
  }
  // 处理城市列表
  dealWithListData = async () => {
    // 处理a-z的数据
    const { data: data1 } = await getCityList()
    console.log(data1);
    let tempObj = {}
    let tempIndexList = []

    data1.body.map(item => {
      const charFirst = item.short.substr(0, 1)
      if (tempObj[charFirst]) {
        tempObj[charFirst].push(item)
      } else {
        tempObj[charFirst] = [item]
      }
    })
    tempIndexList = Object.keys(tempObj).sort()

    // 热门城市
    const { data: data2 } = await getHotCityList()
    tempObj['hot'] = data2.body
    tempIndexList.unshift('hot')

    // 定位城市
    const res3 = await getCurrentCity()
    tempObj['#'] = [res3]
    tempIndexList.unshift('#')

    console.log(data1, data2, res3);
    console.log(tempObj, tempIndexList);
    this.setState({
      cityListIndex: tempIndexList,
      cityListObj: tempObj
    })
  }

  renderCity = () => {
    return (
      //   <Grid data={this.state.cityListObj}
      //   square={false}
      //   columnNum={1}
      //   renderItem={item => (
      //     <div key={item.value} style={{ padding: '12.5px' }}>
      //       <span>{item.label}</span>
      //     </div>
      //   )}
      // />
      <div>
        aaa
      </div>
    )
  }

  render () {
    const { cityListObj, cityListIndex } = this.state
    return (
      <div>
        {/* 这么传会增加父子组件的耦合程度 */}
        {/* <MyNavBar history={this.props.history}>城市选择</MyNavBar> */}
        <MyNavBar>城市选择</MyNavBar>
        {/* 城市列表 */}
        {this.renderCity()}
      </div>
    )
  }
}
