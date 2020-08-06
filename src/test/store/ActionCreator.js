/**
 * action 就像是描述发生了什么的指示器
 * action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作
 * 
 * type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。
 * 
 * ******************************************************************************
 * ******************************************************************************
 * Action 创建函数
 * Action 创建函数 就是生成 action 的方法
 * 它最终的目的，就是生成action对象
 */

import { ADD, MINUS, SET_VISIBILITY_FILTER, ADD_TODO, COMPLETE_TODO, TOGGLE_TODO, SETNAME } from './ActionType'


/**
 * count
 */

export const add = payload => {
  return {
    type: ADD,
    payload
  }
}

export const minus = payload => {
  return {
    type: MINUS,
    payload
  }
}

export const asyncAdd = payload => {
  return dispatch => {
    setTimeout(() => {
      // dispatch调用同步方法
      dispatch(add(payload))
    }, 1000);
  }
}

export const asyncMinus = payload => {
  return dispatch => {
    setTimeout(() => {
      // dispatch调用同步方法
      dispatch(minus(payload))
    }, 2000);
  }
}

/*
 * action 创建函数
 */

export const setVisibilityFilter = filter => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

export const addTodo = text => {
  return {
    type: ADD_TODO,
    text
  }
}

export const toggleTodo = index => {
  return {
    type: TOGGLE_TODO,
    index
  }
}

/**
 * user
 */
// 同步返回对象
export const setName = text => {
  return {
    type: SETNAME,
    text
  }
}
// 异步返回函数
export const asyncSetName = text => {
  return dispatch => {
    setTimeout(() => {
      // 触发同步操作
      dispatch(setName(text))
    }, 1000);
  }
}