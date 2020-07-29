import React, { Component } from 'react'
import styles from './index.module.scss'
import MyNavBar from '../../components/MyNavBar'
import { getCurrentCity } from '../../utils/city'
import { getOverlaysById } from '../../api/map'
import { Toast } from 'antd-mobile'

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

export default class index extends Component {
  initMap = async () => {
    console.log('initMap'); // sys-log

    // 避免地图还没加载完成的情况
    if (!BMap) return

    const { label, value } = await getCurrentCity()
    //  创建地图实例
    this.map = new BMap.Map('container')

    console.log('this.map', this.map); // sys-log

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


  // 渲染各级覆盖物的方法
  renderOberlays = async (id) => {
    // 0：表示要自己控制它的隐藏
    Toast.loading('数据加载中......', 0)
    const { data } = await getOverlaysById(id)
    Toast.hide()
    console.log('overlays', data); // sys-log
    data.body.forEach(item => this.renderCicleOverlay(item))
  }

  // 添加一级覆盖物的方法
  renderCicleOverlay = ({ coord: { longitude, latitude }, count, label: name, value: id }) => {
    // console.log('renderCicleoverlay', longitude, latitude, count, name, id); // sys-log
    // 设置覆盖物
    const point = new BMap.Point(longitude, latitude);
    // 创建选项：设置文本偏移量
    var opts = {
      position: point,    // 指定文本标注所在的地理位置
      offset: new BMap.Size(-35, -35)    //设置文本偏移量
    }
    let label = new BMap.label('', opts)

    label.setContent(`<div style="text-aligh:center;font-size:6px"><p>${name}</p><p>${count}套</p></div>`)
    // 创建文本标注对象
    label.setStyle(labelStype);

    // 把覆盖物放在地图上
    this.map.addOverlay(label);
  }
  render () {
    return (
      <div className={styles.map}>
        <MyNavBar>地图找房</MyNavBar>
        <div id='container'></div>
      </div>
    )
  }
}
