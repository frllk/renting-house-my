import React, { Component } from 'react'
import styles from './index.module.scss'
import MyNavBar from '../../components/MyNavBar'
import { getCurrentCity } from '../../utils/city'
import { getOverlaysById, getHouseList } from '../../api/map'
import { Toast } from 'antd-mobile'
import classNames from 'classnames'
import HouseItem from '../../components/HouseItem'

const BMap = window.BMap
const labelStype = {
  cursor: 'pointer',
  border: '0px solid rgb(255,255,0)',
  padding: 0,
  whiteSpace: 'nowapp',
  color: "rgb(255,255,255)",
  fontSize: "12px",
  height: "20px",
  lineHeight: "20px",
  fontFamily: "微软雅黑"
}

export default class Map extends Component {
  constructor() {
    super()
    this.state = {
      houseList: null, // 房屋列表
      isShow: false  // 是否需要渲染
    }
  }
  componentDidMount () {
    this.initMap()
  }
  initMap = async () => {
    // 避免地图还没加载完成的情况
    if (!BMap) return

    const { label, value } = await getCurrentCity()
    //  创建地图实例 
    // var map 是局部变量，只能在initMap里面用===>创建的内容赋值给实例属性，后面就可以直接通过实例属性map添加覆盖物
    this.map = new BMap.Map('container')
    this.map.addEventListener('touchstart', () => {
      this.setState({
        isShow: false
      })
    })

    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder()
    // 将地址解析
    myGeo.getPoint(
      label,
      point => {
        if (point) {
          this.map.centerAndZoom(point, 11)

          // 显示一级覆盖物
          this.renderOberlays(value)
        }
      },
      label
    )
  }

  // 获取要渲染的覆盖物的类型（'circle','react'）
  // nextZoom: 代表点击之后要放大的级别
  getRenderOverlayTypeAndNextZoom = () => {
    const currentZoom = this.map.getZoom()
    let type = 'circle'
    let nextZoom = 13
    if (currentZoom > 10 && currentZoom < 12) {
      type = 'circle'
      nextZoom = 13
    } else if (currentZoom > 12 && currentZoom < 14) {
      type = 'circle'
      nextZoom = 15
    } else if (currentZoom > 14) {
      type = 'rect'
    }
    return { type, nextZoom }
  }

  // 渲染各级覆盖物的方法
  renderOberlays = async (id) => {
    // 0：表示要自己控制它的隐藏
    Toast.loading('数据加载中......', 0)
    const { data } = await getOverlaysById(id)
    Toast.hide()
    // console.log('overlays', data); // sys-log

    const { type, nextZoom } = this.getRenderOverlayTypeAndNextZoom()
    console.log(type, nextZoom);
    // 根据当前缩放的级别，判断下一级地图缩放级别
    data.body.forEach(item => {
      if (type === 'circle') {
        this.renderCicleOverlay(item, nextZoom)
      } else {
        this.renderReactOverlay(item)
      }
    })
  }

  // 添加一二级覆盖物的方法
  renderCicleOverlay = ({ coord: { longitude, latitude }, count, label: name, value: id }, nextZoom) => {
    // console.log('renderCicleoverlay', longitude, latitude, count, name, id); // sys-log
    // 设置覆盖物的经纬度，前面是经度，后面是纬度
    const point = new BMap.Point(longitude, latitude);
    // 创建选项：设置文本偏移量
    var opts = {
      position: point,    // 指定文本标注所在的地理位置
      offset: new BMap.Size(-35, -35)    //设置文本偏移量
    }
    let label = new BMap.Label('', opts) // 创建文本标注对象

    label.setContent(`<div class=${styles.bubble}><p class=${styles.name}>${name}</p><p class=${styles.name}>${count}套</p></div>`)
    label.setStyle(labelStype);

    label.addEventListener('click', () => {
      // console.log('click', name);
      // 清除掉现在已有的覆盖物
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0);
      // 更改地图的中心点和缩放级别
      this.map.centerAndZoom(point, nextZoom)
      // 调用renderOberlays，去加载点击覆盖物下面的二级覆盖物
      this.renderOberlays(id)
    })


    // 把覆盖物放在地图上
    this.map.addOverlay(label);
  }
  // 渲染三级覆盖物
  renderReactOverlay = ({ coord: { longitude, latitude }, count, label: name, value: id }) => {
    var point = new BMap.Point(longitude, latitude);
    var opts = {
      position: point,    // 指定文本标注所在的地理位置
      offset: new BMap.Size(-50, -20)    //设置文本偏移量
    }
    var label = new BMap.Label("", opts);  // 创建文本标注对象
    label.setContent(`
      <div class=${styles.rect}>
        <span class=${styles.housename}>${name}</span>
        <span class=${styles.housenum}>${count}套</span>
      </div>
    `)
    label.setStyle(labelStype);
    label.addEventListener('click', e => {
      // console.log('e', e); // sys-log
      // 没有点击到
      if (!e.changedTouches || !e.changedTouches[0]) return
      const { clientX, clientY } = e.changedTouches[0]
      const moveX = window.screen.width / 2 - clientX
      // 330: 遮罩
      const moveY = window.screen.height / 2 - clientY - 330 / 2
      this.map.panBy(moveX, moveY)
      // 调用方法获取点击的覆盖物的房源列表数据
      this.getHouseListData(id)

    })
    this.map.addOverlay(label);
  }

  // 房屋列表
  getHouseListData = async (id) => {
    const { data } = await getHouseList(id)
    console.log('list', data.body); // sys-log
    this.setState({
      houseList: data.body.list,
      isShow: true
    })
  }

  // 渲染房屋列表
  renderHouseList = () => {
    const { isShow, houseList } = this.state
    console.log('isShow', isShow); // sys-log
    // [styles.show]：属性名表达式
    return <div className={classNames(styles.houseList, { [styles.show]: isShow })}>
      <div className={styles.titleWrap}>
        <h1 className={styles.listTitle}>房屋列表</h1>
        <a href="/houselist" className={styles.titleMore}>更多房屋</a>
      </div>
      <div className={styles.houseItems}>
        {
          houseList.map(item => <HouseItem key={item.houseCode} {...item} />)
        }
      </div>
    </div>
  }

  render () {
    const { houseList } = this.state
    return (
      <div className={styles.map}>
        <MyNavBar>地图找房</MyNavBar>
        <div id='container'></div>
        {houseList && this.renderHouseList()}
      </div>
    )
  }
}
