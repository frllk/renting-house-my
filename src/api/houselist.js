/**
 * 房屋列表
 */
import request from '../utils/request.js'

/**
 * 分享查询房源列表
 * @param {*} param0 分页查询条件
 * data={area: '', characteristic: '', floor: '', rentType: '',oriented: '', price: '',roomType: '', subway:'',more:''}
 */
export const getHouseList = ({ cityId, data, start = 1, end = 20 }) => request({
  url: 'houses',
  params: {
    cityId,
    start,
    end,
    ...data
  }
})