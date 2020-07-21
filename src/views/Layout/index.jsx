import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home'
import HouseList from '../HouseList'
import News from '../News'
import My from '../My'
import NotFound from '../404'

class Login extends Component {
  render () {
    return <div>
      {/* 路由配置的地方 */}
      <Switch>
        <Route path='/layout/home' component={Home} />
        <Route path='/layout/houseList' component={HouseList} />
        <Route path='/layout/news' component={News} />
        <Route path='/layout/my' component={My} />
        <Redirect from='/layout' to='/layout/home' exact component={Home} />
        <Route component={NotFound} />
      </Switch>
      {/* TabBar */}
      <div style={{ position: 'fixed', height: '50px', left: 0, right: 0, bottom: 0 }}>
        <Link to='/layout/home'>首页</Link>&nbsp;
        <Link to='/layout/houseList'>找房</Link>&nbsp;
        <Link to='/layout/news'>咨询</Link>&nbsp;
        <Link to='/layout/my'>我的</Link>&nbsp;
      </div>
    </div>
  }
}

export default Login