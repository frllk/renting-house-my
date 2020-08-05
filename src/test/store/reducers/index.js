// 导入reducer
import { combineReducers } from 'redux'
import count from './count'
import visibility from './visibilityFilter'
import todos from './todos'
import user from './user'

// combineReducers() 将多个 reducer 合并成为一个
export default combineReducers({ count, todos, visibility, user })
