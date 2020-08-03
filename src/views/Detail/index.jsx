import React, { Component } from 'react'
import styles from './index.module.scss'
import { Carousel, Flex, Modal } from 'antd-mobile'
import MyNavBar from '../../components/MyNavBar'
import { getHouseInfo } from '../../api/detail'
import classNames from 'classnames'
import HouseMatch from '../../components/HouseMatch'
import HouseItem from '../../components/HouseItem'
import { getToken } from '../../utils/token'

const BMap = window.BMap
const labelStyle = {
  position: 'absolute',
  zIndex: -1,
  backgroundColor: 'rgb(238, 93, 91)',
  color: 'rgb(255, 255, 255)',
  height: 25,
  padding: '5px 10px',
  lineHeight: '14px',
  borderRadius: 3,
  boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
  whiteSpace: 'nowrap',
  fontSize: 12,
  userSelect: 'none'
}

// 猜你喜欢
const recommendHouses = [
  {
    id: 1,
    houseCode: '5cc477061439630e5b467b0b',
    houseImg: '/newImg/7bk83o0cf.jpg',
    desc: '72.32㎡/南 北/低楼层',
    title: '安贞西里 3室1厅',
    price: 4500,
    tags: ['随时看房']
  },
  {
    id: 2,
    houseCode: '5cc4a1dd1439630e5b502266',
    houseImg: '/newImg/7bk83o0cf.jpg',
    desc: '83㎡/南/高楼层',
    title: '天居园 2室1厅',
    price: 7200,
    tags: ['近地铁']
  },
  {
    id: 3,
    houseCode: '5cc46a921439630e5b439611',
    houseImg: '/newImg/7bk83o0cf.jpg',
    desc: '52㎡/西南/低楼层',
    title: '角门甲4号院 1室1厅',
    price: 4300,
    tags: ['集中供暖']
  }
]

export default class Detail extends Component {
  constructor() {
    super()
    this.state = {
      navTitle: '加载中',
      houseInfo: null,
      imgHeight: 252, // 轮播图高度
      isFavorite: false // 是否收藏
    }
  }

  // 组件创建时
  componentDidMount () {
    this.getHouseInfoData()
  }

  // 获取房屋信息
  getHouseInfoData = async () => {
    const { data } = await getHouseInfo(this.props.match.params.id)
    console.log(data)
    this.setState({
      navTitle: data.body.community,
      houseInfo: data.body
    }, () => {
      setTimeout(() => {
        this.initMap()
      }, 200);
    })
  }

  // 渲染轮播图
  renderSwiper = () => {
    const { houseInfo } = this.state
    return (
      <Carousel autoplay={true} infinite>
        {houseInfo.houseImg.map((item, index) => (
          <a
            key={'swiper' + index}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`${process.env.REACT_APP_BASHURL}${item}`}
              alt=''
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
  // 渲染基本信息
  renderBaseInfo = () => {
    const { houseInfo } = this.state
    return (
      <div className={styles.info}>
        <h3 className={styles.infoTitle}>{houseInfo.title}</h3>
        <Flex className={styles.tags}>
          {houseInfo.tags.map((item, index) => {
            const tagName = `tag${(index % 3) + 1}`
            return (
              <span
                className={classNames(styles.tag, styles[tagName])}
                key={item}
              >
                {item}
              </span>
            )
          })}
        </Flex>
        <Flex className={styles.infoPrice} align='center'>
          <Flex.Item className={styles.infoPriceItem}>
            <div>
              {houseInfo.price}
              <span className={styles.month}>/月</span>
            </div>
            <div>租金</div>
          </Flex.Item>
          <Flex.Item className={styles.infoPriceItem}>
            <div>{houseInfo.roomType}</div>
            <div>房型</div>
          </Flex.Item>
          <Flex.Item className={styles.infoPriceItem}>
            <div>{houseInfo.size}</div>
            <div>面积</div>
          </Flex.Item>
        </Flex>
        <Flex className={styles.infoBasic} align='center'>
          <Flex.Item>
            <div>
              <span className={styles.title}>装修：</span>
              精装修
            </div>
            <div>
              <span className={styles.title}>楼层：</span>
              {houseInfo.floor}
            </div>
          </Flex.Item>
          <Flex.Item>
            <div>
              <span className={styles.title}>朝向：</span>
              {houseInfo.oriented && houseInfo.oriented.join(' ')}
            </div>
            <div>
              <span className={styles.title}>类型：</span>普通住宅
            </div>
          </Flex.Item>
        </Flex>
      </div>
    )
  }

  // 渲染地图
  renderMap = () => {
    const { community } = this.state.houseInfo
    return <div className={styles.map}>
      <div className={styles.mapTitle}>小区：{community}</div>
      <div className={styles.mapContainer} id="map"></div>
    </div>
  }

  // 初始化地图
  initMap = () => {
    const { coord: { latitude, longitude }, community } = this.state.houseInfo
    // 创建地图实例
    var map = new BMap.Map("map");
    // 设置地图中心点  经度 纬度
    var point = new BMap.Point(longitude, latitude);
    // 地图初始化，同时设置地图展示级别
    map.centerAndZoom(point, 15);

    // 给小区地图上面加上覆盖物
    var opts = {
      position: point,    // 指定文本标注所在的地理位置
      offset: new BMap.Size(-36, -66)    //设置文本偏移量
    }
    var label = new BMap.Label("", opts);  // 创建文本标注对象
    label.setContent(`
      <span>${community}</span>
      <div class=${styles.mapArrow}></div>
    `)
    label.setStyle(labelStyle);
    map.addOverlay(label);
  }

  // 渲染房屋配套
  renderHouseMatch = () => {
    const { supporting } = this.state.houseInfo
    return <div className={styles.about}>
      <div className={styles.houseTitle}>房屋配套</div>
      {
        supporting.length === 0 ? <div>暂无数据</div> : <HouseMatch data={supporting} />
      }
    </div>
  }

  // 渲染房屋概况 => 描述
  renderDescription = () => {
    return (
      <div className={styles.set}>
        <div className={styles.houseTitle}>房源概况</div>
        <div>
          <div className={styles.contact}>
            <div className={styles.user}>
              <img src='http://huangjiangjun.top:8088/img/avatar.png' alt='' />
              <div className={styles.useInfo}>
                <div>王女士</div>
                <div className={styles.userAuth}>
                  <i className='iconfont icon-auth'></i>
                  已认证房主
                </div>
              </div>
            </div>
            <div className={styles.userMsg}>发消息</div>
          </div>
        </div>
        <div className={styles.descText}>
          {this.state.houseInfo.description.length > 0
            ? this.state.houseInfo.description
            : '暂无描述'}
        </div>
      </div>
    )
  }

  // 猜你喜欢
  renderRecommend = () => {
    return (
      <div className={styles.recommend}>
        <div className={styles.houseTitle}>猜你喜欢</div>
        <div className={styles.items}>
          {recommendHouses.map(item => {
            return <HouseItem key={item.houseCode} {...item} />
          })}
        </div>
      </div>
    )
  }
  // 渲染底部
  renderFooter = () => {
    const { isFavorite } = this.state

    return (
      <Flex className={styles.fixedBottom} align='center'>
        <Flex.Item onClick={() => this.favoriteOrNot()}>
          <img
            style={{ height: 16 }}
            className={styles.favoriteImg}
            src={
              isFavorite
                ? 'http://huangjiangjun.top:8088/img/star.png'
                : 'http://huangjiangjun.top:8088/img/unstar.png'
            }
            alt=''
          />
          <span className={styles.favorite}>
            {isFavorite ? '已收藏' : '收藏'}
          </span>
        </Flex.Item>
        <Flex.Item>在线咨询</Flex.Item>
        <Flex.Item className={styles.telephone}>
          <a className={styles.telephone} href='tel:4001234567'>
            电话预约
          </a>
        </Flex.Item>
      </Flex>
    )
  }
  // 收藏&取消收藏
  favoriteOrNot = () => {
    // 1. 判断是否登录，如果没有登录，则提示，然后根据用户的选择进行处理
    const token = getToken()
    if (!token) {
      Modal.alert('提示', '登录后才能收藏房源，是否去登录？', [
        { text: '取消', onPress: () => null, style: 'default' },
        { text: '去登录', onPress: () => this.props.history.push('/login') },
      ]);
      return
    }
  }
  render () {
    const { navTitle, houseInfo } = this.state
    return (
      <div className={styles.root}>
        <MyNavBar className={styles.detailHeader} rightContent={[<i key='share' className='iconfont icon-share' />]}>{navTitle}</MyNavBar>
        {/* 渲染轮播图 */}
        {houseInfo && this.renderSwiper()}
        {/* 渲染基本信息 */}
        {houseInfo && this.renderBaseInfo()}
        {/* 渲染地图 */}
        {houseInfo && this.renderMap()}
        {/* 渲染房屋配套 */}
        {houseInfo && this.renderHouseMatch()}
        {/* 渲染房屋概况 */}
        {houseInfo && this.renderDescription()}
        {/* 渲染猜你喜欢 */}
        {houseInfo && this.renderRecommend()}
        {/* 渲染底部 */}
        {houseInfo && this.renderFooter()}
      </div>
    )
  }
}