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
import RentAdd from './views/Rent/Add'
import AuthRoute from './components/AuthRoute'
// import ReduxIndex from './test/redux';
// import ReactReduxIndex from './test/react-redux'
import RentSearch from './views/Rent/search';

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
          {/* <Route path='/redux' component={ReduxIndex} />
          <Route path='/react-redux' component={ReactReduxIndex} /> */}
          {/* 这样写没有进行任何的权限控制 */}
          {/* <Route path='/rent' component={Rent} /> */}
          {/*  <Route exact path='/rent/add' render={props => {
            // console.log('render', props)
            if (isAuth()) { // 有权限
              return <Rent {...props} />
            } else { // 没权限
              return <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
            }
          }} />

          <Route exact path='/rent/add' render={props => {
            // console.log('render', props)
            if (isAuth()) { // 有权限
              return <RentAdd {...props} />
            } else { // 没权限
              return <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
            }
          }} /> */}
          {/* <Route path='/rent' render={props => {
            // console.log('render', props)
            if (isAuth()) { // 有权限
              return <Rent {...props} />
            } else { // 没权限
              return <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
            }
          }} /> */}
          {/* 权限控制的写法 */}
          {/* {<AuthRoute exact path='/rent' component={Rent} />} */}
          {/* <AuthRoute exact path='/rent'>
            <Rent />
          </AuthRoute>
          <AuthRoute path='/rent/add'>
            <RentAdd />
          </AuthRoute>
          <AuthRoute path='/rent/search'>
            <RentSearch />
          </AuthRoute> */}
          <AuthRoute exact path='/rent' component={Rent} />
          <AuthRoute path='/rent/add' component={RentAdd} />
          <AuthRoute path='/rent/search' component={RentSearch} />

          <Redirect from='/' to='/layout' exact component={Layout} />
          {/* <Route to='/redux' component={ReduxIndex} />
          <Route to='/react-redux' component={ReactReduxIndex} /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
