import React, { Component } from 'react'
import styles from './index.module.scss'
import { SearchBar } from 'antd-mobile'
import { getCommunity } from '../../../api/rent'
import { getCurrentCity } from '../../../utils/city'
import { connect } from 'react-redux'
import { setCommunity } from '../../../store/actionCreator'

export default connect(
  null,
  // dispatch => {
  //   return {
  //     setCommunityData: function (obj) {
  //       // 触发设置小区对象的action
  //       dispatch(setCommunity(obj))
  //     }
  //   }
  // }
  { setCommunity }
)(
  class RentSearch extends Component {
    state = {
      communityList: null
    }
    // 防抖
    debounce = (fun, delay) => {
      return function (args) {
        //获取函数的作用域和变量
        let that = this
        let _args = args
        //每次事件被触发，都会清除当前的timeer，然后重写设置超时调用
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
          fun.call(that, _args)
        }, delay)
      }
    }
    componentDidMount () {
      this.debounceSearch = this.debounce(this.search, 500)
    }

    onChange = async val => {
      this.debounceSearch(val)
    }

    // 搜索
    search = async name => {
      const { value: id } = await getCurrentCity()
      const { data } = await getCommunity(id, name)
      console.log(data)
      this.setState({
        communityList: data.body
      })
    }

    toggleSelect = ({ community, communityName }) => {
      console.log(community, communityName)
      // setCommunity
      this.props.setCommunity({ community, communityName })
      this.props.history.goBack()
    }

    render () {
      const { communityList } = this.state
      return (
        <div className={styles.root}>
          <SearchBar placeholder='请输入小区或地址' onCancel={() => this.props.history.goBack()} onChange={this.onChange} />
          {
            communityList && <ul className={styles.tips}>
              {
                communityList.map(item => <li key={item.community} onClick={() => {
                  this.toggleSelect(item)
                }}>
                  {item.communityName}
                </li>)
              }
            </ul>
          }
        </div>
      )
    }
  }
) 