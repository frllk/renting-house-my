import React from 'react'
import styles from './index.module.scss'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

function MyNavBar ({ children, history }) {
  return (
    <NavBar
      className={styles.navBar}
      icon={<i className="iconfont icon-back"></i>}
      onLeftClick={() => {
        console.log(1);
        history.goBack()
      }}
      rightContent={() => {

      }}
    >{children}</NavBar>
  )
}

export default withRouter(MyNavBar)