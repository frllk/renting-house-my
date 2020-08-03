import React, { Component } from 'react'
import styles from './index.module.scss'
import { Flex } from 'antd-mobile'
import SearchBar from '../../components/SearchBar'
import { getCurrentCity } from '../../utils/city'


export default class HouseList extends Component {
  constructor() {
    super()
    this.state = {
      cityName: ''
    }
  }
  async componentDidMount () {
    const { value, label } = await getCurrentCity()
    console.log(value, label);
    this.setState({
      cityName: label
    })
  }

  render () {
    const { cityName } = this.state
    return (
      <div className={styles.root}>
        <Flex className={styles.listHeader}>
          <i onClick={() => this.props.history.goBack()} className="iconfont icon-back"></i>
          {/* className:这里是传值  SearchBar组件内部进行处理 */}
          <SearchBar className={styles.mySearchBar} cityName={cityName} />
        </Flex>
      </div>
    )
  }
}
