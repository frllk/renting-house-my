import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home'
import HouseList from '../HouseList'
import News from '../News'
import My from '../My'
import NotFound from '../404'
import Styles from './index.module.scss'
import { TabBar } from 'antd-mobile';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // selectPath: localStorage.getItem('currRoute') || '/layout/home'
      selectPath: props.location.pathname
    }
  }

  // 当Layout组件的props发生了改变，就会执行
  // componentWillReceiveProps (props) {
  //   console.log(props)
  //   this.setState({
  //     selectPath: props.location.pathname
  //   })
  // }

  static getDerivedStateFromProps (props, state) {
    // 返回的对象，会覆盖state中模型的值
    return {
      selectPath: props.location.pathname
    }
  }

  // tabs数组
  TABS = [
    {
      title: '首页',
      icon: 'icon-index',
      path: '/layout/home'
    },
    {
      title: '找房',
      icon: 'icon-findHouse',
      path: '/layout/houselist'
    },
    {
      title: '资讯',
      icon: 'icon-info',
      path: '/layout/news'
    },
    {
      title: '我的',
      icon: 'icon-my',
      path: '/layout/my'
    }
  ]
  renderTabBar = () => {
    const { push } = this.props.history
    return (
      <TabBar tintColor="#21B97A" noRenderContent={true}>
        {
          this.TABS.map(item => {
            return <TabBar.Item
              title={item.title}
              key={item.path}
              icon={<i className={`iconfont ${item.icon}`} />}
              selectedIcon={<i className={`iconfont ${item.icon}`} />}
              selected={this.state.selectPath === item.path}
              onPress={() => {
                this.setState({
                  selectPath: item.path,
                });
                if (this.state.selectPath !== item.path)
                  push({ pathname: item.path })
                // localStorage.setItem('currRoute', item.path)
              }}
            />
          })
        }
      </TabBar>
    )
  }
  render () {
    return <div className={Styles.layout}>
      {/* 路由配置的地方 */}
      <Switch>
        <Route path='/layout/home' component={Home} />
        <Route path='/layout/houselist' component={HouseList} />
        <Route path='/layout/news' component={News} />
        <Route path='/layout/my' component={My} />
        <Redirect from='/layout' to='/layout/home' exact component={Home} />
        <Route component={NotFound} />
      </Switch>
      {/* TabBar */}
      <div className={Styles.tabbar}>{this.renderTabBar()}</div>
    </div>
  }
}

export default Login