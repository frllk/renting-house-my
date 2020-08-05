import { SETNAME } from '../ActionType'

export default (state = 'unknown', action) => {
  switch (action.type) {
    case SETNAME:
      return action.text
    default:
      return state
  }
}