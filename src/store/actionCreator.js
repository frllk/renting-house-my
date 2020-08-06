import { SET_COMMUNITY } from './actionType'

export const setCommunity = payload => {
  return {
    type: SET_COMMUNITY,
    payload
  }
}