/**
 * 赛选组件 相关处理
 */
import request from '../utils/request'


/**
 * 获取房屋筛选条件
 * @param {*} id 城市id
 */
export const getHouseCondition = id => {
  return request({
    url: `houses/condition?id=${id}`
  })
}