import React from 'react';
import './App.css';
// 导入路由相关依赖
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// 导入子路由
import Layout from './views/Layout'
import Login from './views/Login'
import NotFound from './views/404'
import CityList from './views/CityList'

function App () {
  return (
    <div className="App" style={{ height: '100%' }}>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/layout' component={Layout} />
          <Route path='/citylist' component={CityList} />
          <Redirect from='/' to='/layout' exact component={Layout} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
