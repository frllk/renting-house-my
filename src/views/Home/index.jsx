import React, { Component } from 'react'
import styles from './index.module.scss'
import { getSwiper, getGroups, getNews } from '../../api/home'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';


// 以模块的方式，加载本地图片
import image1 from '../../assets/images/nav-1.png'
import image2 from '../../assets/images/nav-2.png'
import image3 from '../../assets/images/nav-3.png'
import image4 from '../../assets/images/nav-4.png'

// 引入SearchBar子组件
import SearchBar from '../../components/SearchBar';
import { getCurrentCity } from '../../utils/city';

export default class Home extends Component {

  constructor() {
    super()
    this.state = {
      swiper: [],
      imgHeight: 212,  // 轮播图中图片的高度
      groups: null, // 租房小组
      news: null, // 最新咨询
      cityName: '深圳' // 定位的城市名
    }
  }
  // 创建时钩子函数
  async componentDidMount () {
    const { label } = await getCurrentCity()
    this.setState({
      cityName: label
    })

    // 获取轮播图数据
    this.getSwiperData()
    // 获取租房小组的数据
    this.getGroups()
    // 获取最新资讯的数据
    this.getNews()
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
              style={{ width: '100%', verticalAlign: 'top' }}
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

  // nav相关*****************************************
  // 定义的实例属性
  navs = [
    { icon: image1, text: '整租', path: '/layout/houselist' },
    { icon: image2, text: '合租', path: '/layout/houselist' },
    { icon: image3, text: '地图找房', path: '/map' },
    { icon: image4, text: '去出租', path: '/rent/add' }
  ]
  // 渲染nav
  renderNavs = () => {
    return (
      <Flex className={styles.nav}>
        {this.navs.map(item => {
          return (
            <Flex.Item onClick={() => this.props.history.push(item.path)} key={`navs-${item.text}`}>
              <img src={item.icon} alt="" />
              <p>{item.text}</p>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  }
  // 租房小组相关*****************************************
  getGroups = async () => {
    const { data } = await getGroups()
    this.setState({
      groups: data.body
    })
  }
  // 渲染租房小组
  renderGroups = () => {
    return (
      <div className={styles.groups}>
        <Flex>
          <Flex.Item className={styles.title}>租房小组</Flex.Item>
          <Flex.Item align='end'>更多</Flex.Item>
        </Flex>
        <Grid data={this.state.groups} square={false} hasLine={false} columnNum={2} renderItem={dataItem => (
          <div key={dataItem.id} className={styles.navItem}>
            <div className={styles.left}>
              <p>{dataItem.title}</p>
              <p>{dataItem.desc}</p>
            </div>
            <div className={styles.right}>
              <img src={`${process.env.REACT_APP_BASHURL}${dataItem.imgSrc}`} alt="" />
            </div>
          </div>
        )} >
        </Grid>
      </div >
    )
  }
  // 最新咨询相关*****************************************
  getNews = async () => {
    const { data } = await getNews()
    this.setState({
      news: data.body
    })
  }
  // 渲染最新咨询
  renderNews = () => {
    return (
      <div className={styles.news}>
        <h3 className={styles.groupTitle}>最新咨询</h3>
        <WingBlank size="md">
          {
            this.state.news.map(item => (
              <div key={item.id} className={styles.newsItem}>
                <div className={styles.imgWrap}>
                  <img src={`${process.env.REACT_APP_BASHURL}${item.imgSrc}`} alt="" />
                </div>
                <Flex className={styles.content} direction='column' justify='between'>
                  <h3 className={styles.title}>{item.title}</h3>
                  <Flex className={styles.info} justify='between'>
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                  </Flex>
                </Flex>
              </div>
            ))
          }

        </WingBlank>
      </div >
    )
  }
  render () {
    const { swiper, groups, news, cityName } = this.state
    return (
      <div className={styles.root}>
        {/* 搜索条: 直接导入进行渲染的，不是通过路由方式渲染出来的，所以没有三个对象（history，location，match） */}
        <SearchBar cityName={cityName} />
        {/* 轮播图 */}
        {swiper && this.renderSwiper()}
        {/* 渲染NAV */}
        {this.renderNavs()}
        {/* 租房小组 */}
        {groups && this.renderGroups()}
        {/* 最新咨询 */}
        {news && this.renderNews()}
      </div>
    )
  }
}
