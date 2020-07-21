import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home'
import HouseList from '../HouseList'
import News from '../News'
import My from '../My'
import NotFound from '../404'
import Styles from './index.module.scss'
import { TabBar } from 'antd-mobile';

class Login extends Component {
  constructor(props) {
    super()
    this.state = {
      selectPath: localStorage.getItem('currRoute') || '/layout/home'
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
                push({ pathname: item.path })
                localStorage.setItem('currRoute', item.path)
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
      <div>
        <Switch>
          <Route path='/layout/home' component={Home} />
          <Route path='/layout/houseList' component={HouseList} />
          <Route path='/layout/news' component={News} />
          <Route path='/layout/my' component={My} />
          <Redirect from='/layout' to='/layout/home' exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
      {/* TabBar */}
      <div className={Styles.tabbar}>{this.renderTabBar()}</div>
    </div>
  }
}

export default Login