import React, { Component } from 'react'
import Styles from './index.module.scss'
import { getSwiper } from '../../api/home'
import { Carousel } from 'antd-mobile';

export default class Home extends Component {

  constructor() {
    super()
    this.state = {
      swiper: [],
      imgHeight: 212  // 轮播图中图片的高度
    }
  }
  // 创建时钩子函数
  componentDidMount () {
    this.getSwiperData()
  }
  /**
   * 获取轮播图
   */
  getSwiperData = async () => {
    const { data } = await getSwiper()
    this.setState({
      swiper: data.body
    })
  }
  // 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel autoplay={true} infinite>
        {this.state.swiper.map(val => (
          <a
            key={val.id}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`${process.env.REACT_APP_BASHURL}${val.imgSrc}`}
              alt={val.alt}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  render () {
    return (
      <div className={Styles.root}>
        {/* 轮播图 */}
        <div className={Styles.swiper}>{this.renderSwiper()}</div>
      </div>
    )
  }
}
