import React from 'react'
import styles from './index.module.scss'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

function MyNavBar ({ children, rightContent, className, history }) {
  return (
    <NavBar
      className={classNames(styles.navBar, className)}
      icon={<i className="iconfont icon-back"></i>}
      onLeftClick={() => {
        // console.log(1);
        history.goBack()
      }}
      rightContent={rightContent}
    >{children}</NavBar>
  )
}

export default withRouter(MyNavBar)