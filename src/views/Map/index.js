import React, { Component } from 'react'
import styles from './index.module.scss'
import MyNavBar from '../../components/MyNavBar'
import { getCurrentCity } from '../../utils/city'

const BMap = window.BMap

export default class index extends Component {
  initMap = async () => {
    const { label } = await getCurrentCity()
    //  创建地图实例
    var map = new BMap.Map('container')

    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder()
    // 将地址解析
    myGeo.getPoint(
      label,
      point => {
        if (point) {
          map.centerAndZoom(point, 11)
        }
      },
      label
    )
  }

  componentDidMount () {
    this.initMap()
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
