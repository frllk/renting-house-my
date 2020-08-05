/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 * 
 * reducer 只是一个接收 state 和 action，并返回新的 state 的函数
 * 
 * state 就是第一次时候的值，或是上一次的值
 *
 * action 它代表的动作 {type:'ADD',payload:3} {type:'MINUS',payload:2}
 */
import { ADD, MINUS } from '../ActionType'

// 单一数据源
// State 是只读的
// 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
export default (state = 200, action) => {
  // console.log('action', action)
  switch (action.type) {
    case ADD:
      return state + action.payload
    case MINUS:
      return state - action.payload
    default:
      // 第一次的时候，返回初始值
      return state
  }
}