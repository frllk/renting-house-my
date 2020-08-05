/**
 * 权限封装
 * 封装的目的：也是为了将来更加简单的调用
 * 函数的剩余参数...
 */

import React from 'react'
import { isAuth } from '../../utils/token'
import { Route, Redirect } from 'react-router-dom'

/* function AuthRoute ({ component: Comp, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={props => {
          if (isAuth()) { // 有权限
            return <Comp {...props} />
          } else { // 没权限
            return <Redirect to={{
              pathname: '/login',
              state: { from: props.location.pathname }
            }} />
          }
        }} />
    </>
  )
} */
function AuthRoute ({ children, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={props => isAuth() ? children : <Redirect to={{
          pathname: '/login',
          state: { from: props.location.pathname }
        }} />
        } />
    </>
  )
}
export default AuthRoute