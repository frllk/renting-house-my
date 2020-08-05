/**
 * toto案例
 * 当前选中的任务过滤条件；
 * 完整的任务列表。
 */

import { ADD_TODO, COMPLETE_TODO } from '../ActionType'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            // completed: true
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}