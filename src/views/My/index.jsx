import React, { Component } from 'react'
import styles from './index.module.scss'
import { Button, Grid } from 'antd-mobile'
import { Link } from 'react-router-dom'



// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-index', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record', to: '' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity',
    to: ''
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo', to: '' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust', to: '' }
]

export default class My extends Component {
  constructor() {
    super()
    this.state = {
      isLogin: false, // 是否登录
      avatar: '/img/profile/avatar.png', // 头像
      nickname: '游客',
    }
  }
  render () {
    const { avatar, isLogin, nickname } = this.state
    return (
      <div>
        <div className={styles.title}>
          <img className={styles.bg} src="http://huangjiangjun.top:8088/img/profile/bg.png" alt="" />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img className={styles.avatar} src={`${process.env.REACT_APP_BASHURL}${avatar}`} alt="icon" />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{nickname}</div>
              {
                isLogin && <div className={styles.auth}><span>退出</span></div>
              }

              <div className={styles.edit}>

              </div>
              <div className={styles.edit}>
                {
                  isLogin
                    ?
                    <>
                      编辑个人资料
                      <span className={styles.arrow}><i className="iconfont icon-arrow" /></span>
                    </>
                    : <Button type="primary" onClick={() => this.props.history.push('/login')} inline size="small" style={{ marginRight: '4px' }}>去登录</Button>
                }

              </div>
            </div>
          </div>
        </div>
        <Grid data={menus} columnNum={3} square={false} hasLine={false} renderItem={(item) => {
          return <Link key={item.id} to={item.to}>
            <div className={styles.menuItem}>
              <i className={`iconfont ${item.iconfont}`}></i>
              <span>{item.name}</span>
            </div>
          </Link>
        }} />
        <div className={styles.ad}>
          <img src="http://huangjiangjun.top:8088/img/profile/join.png" alt="" />
        </div>
      </div >
    )
  }
}
