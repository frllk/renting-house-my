/**
 * 城市列表组件
 */
import React, { Component } from 'react'
import styles from './index.module.scss'
import MyNavBar from '../../components/MyNavBar'
import { getCityList, getHotCityList } from '../../api/city'
import { getCurrentCity } from '../../utils/city'
import { AutoSizer, List } from 'react-virtualized';


const TITLE_HEIGHT = 36
const CITY_HEIGHT = 50

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

  renderCity = (
    {
      key, // Unique key within array of rows
      index, // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      style, // Style object to be applied to row (to position it)
    }
  ) => {
    console.log(style)
    return (
      <div key={key} style={style}>
        1111---{index}
      </div>
    )
  }

  calRowHeight = ({ index }) => {
    const { cityListObj, cityListIndex } = this.state
    const letter = cityListIndex[index]
    const list = cityListObj[letter]
    const length = list ? list.length : 1
    return TITLE_HEIGHT + length * CITY_HEIGHT
  }

  render () {
    const { cityListIndex } = this.state
    console.log(cityListIndex)
    return (
      <div className={styles.citylist}>
        {/* 这么传会增加父子组件的耦合程度 */}
        {/* <MyNavBar history={this.props.history}>城市选择</MyNavBar> */}
        <MyNavBar>城市选择</MyNavBar>
        {/* 城市列表 */}
        {
          cityListIndex && (<AutoSizer>
            {
              ({ height, width }) => {
                return <List
                  // style={{ backgroundColor: 'red' }}
                  width={width}
                  height={height - 45}
                  rowCount={20}
                  rowHeight={() => this.calRowHeight(cityListIndex.length)}
                  rowRenderer={this.renderCity}
                />
              }
            }
          </AutoSizer>)
        }
      </div>
    )
  }
}
