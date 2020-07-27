/**
 * 封装搜索子组件
 */
// 导入React，方便下面使用jsx语法
import React from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.module.scss'
import { Link, withRouter } from 'react-router-dom'

function SearchBar ({ cityName, history }) {
  return (
    <Flex className={styles.root}>
      <Flex className={styles.searchLeft}>
        {/* <Link to='/citylist'> */}
        <div onClick={() => {
          history.push('/citylist')
        }} className={styles.location}>
          <span>{cityName}</span>
          <i className="iconfont icon-arrow"></i>
        </div>
        {/* </Link> */}
        <div className={styles.searchForm}>
          <i className="iconfont icon-search"></i>
          <span>请输入小区或地址</span>
        </div>
      </Flex>
      <i onClick={() => history.push('/map')} className="iconfont icon-map"></i>
    </Flex >
  )
}
// export default SearchBar
export default withRouter(SearchBar)