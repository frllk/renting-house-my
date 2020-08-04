import React from 'react';
import './App.css';
// 导入路由相关依赖
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// 导入子路由
import Layout from './views/Layout'
import Login from './views/Login'
import NotFound from './views/404'
import CityList from './views/CityList'
import Map from './views/Map'
import Detail from './views/Detail'
import Rent from './views/Rent';
import { isAuth } from './utils/token'

function App () {
  return (
    <div className="App" style={{ height: '100%' }}>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/layout' component={Layout} />
          <Route path='/citylist' component={CityList} />
          <Route path='/map' component={Map} />
          {/* :id ===> vue中叫：动态路径参数 */}
          <Route path='/detail/:id' component={Detail} />
          {/* 这样写没有进行任何的权限控制 */}
          {/* <Route path='/rent' component={Rent} /> */}
          <Route path='/rent' render={props => {
            if (isAuth()) { // 有权限
              return <Rent />
            } else { // 没权限
              return <Redirect to={{ pathname: '/login', state: { from: '/rent' } }} />
            }
          }} />
          <Redirect from='/' to='/layout' exact component={Layout} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
