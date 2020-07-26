/**
 * 城市列表组件
 */
import React, { Component } from 'react'
import styles from './index.module.scss'
import MyNavBar from '../../components/MyNavBar'
import { getCityList, getHotCityList } from '../../api/city'
import { getCurrentCity, setLocalCity } from '../../utils/city'
import { AutoSizer, List } from 'react-virtualized';
import { Toast } from 'antd-mobile'


const TITLE_HEIGHT = 36
const CITY_HEIGHT = 50
const HASDATA = ['北京', '上海', '广州', '深圳']
export default class CityList extends Component {

  constructor() {
    super()
    this.state = {
      cityListObj: null, // 左侧的城市列表对象
      cityListIndex: null, // 右侧的城市索引数组
      selectedIndex: 0 // 选中的索引
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

    // console.log(data1, data2, res3);
    // console.log(tempObj, tempIndexList);
    this.setState({
      cityListIndex: tempIndexList,
      cityListObj: tempObj
    })
  }

  // 格式化标题
  formatTitle = letter => {
    switch (letter) {
      case '#':
        return '定位城市';
      case 'hot':
        return '热门城市';
      default:
        return letter.toUpperCase()
    }
  }

  rowRenderer = (
    {
      key, // Unique key within array of rows
      index, // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      style, // Style object to be applied to row (to position it)
    }
  ) => {
    // console.log(style) //{height: 236, left: 0, position: "absolute", top: 86, width: "100%"}
    const { cityListObj, cityListIndex } = this.state
    const letter = cityListIndex[index]
    const list = cityListObj[letter]
    // console.log(letter)
    // console.log(index, letter);
    return (
      <div className={styles.city} key={key} style={style}>
        <div className={styles.title}>{this.formatTitle(letter)}</div>
        {
          list.map(item => {
            return <div onClick={() => this.toggleCitySelect(item)} className={styles.name} key={item.value}>{item.label} </div>
          })
        }
      </div>
    )
  }

  // 切换城市的渲染
  toggleCitySelect = ({ label, value }) => {
    if (!HASDATA.includes(label)) {
      Toast.info('该城市暂无房源', 1)
      return
    }

    // 保存到本地
    setLocalCity({ label, value })

    // 关闭当前页面
    console.log(this.props);
    this.props.history.goBack()
  }

  calRowHeight = ({ index }) => {
    const { cityListObj, cityListIndex } = this.state
    const letter = cityListIndex[index]
    const list = cityListObj[letter]
    const length = list ? list.length : 1
    return TITLE_HEIGHT + length * CITY_HEIGHT
  }

  // 切换右边的索引
  toggleSelect = index => {
    // console.log(index);
    // this.setState({
    //   selectedIndex: index
    // })
    this.listRef.current.scrollToRow(index)
  }
  listRef = React.createRef()
  // 渲染右侧索引列表
  renderCityIndexList = () => {
    const { cityListIndex, selectedIndex } = this.state
    return (
      <div className={styles.cityIndex}>
        {
          cityListIndex.map((item, index) => {
            return (
              <div
                onClick={() => this.toggleSelect(index)}
                className={styles.cityIndexItem}
                key={item}>
                <span className={selectedIndex === index ? styles.indexActive : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
  onRowsRendered = ({ startIndex }) => {
    console.log(startIndex)
    if (startIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: startIndex
      })
    }
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
        {/* 渲染左侧列表 */}
        {cityListIndex && (<AutoSizer>
          {({ height, width }) => {
            return <List
              // style={{ backgroundColor: 'red' }}
              ref={this.listRef}
              width={width}
              height={height - 45}
              rowCount={cityListIndex.length}
              rowHeight={this.calRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment='start'
            />
          }}
        </AutoSizer>)}
        {/* 渲染右边的索引 */}
        {cityListIndex && this.renderCityIndexList()}
      </div>
    )
  }
}
