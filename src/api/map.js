/**
 * 和地图相关的操作
 */
import request from '../utils/request'

/**
 * 根据id获取该id下面的所有覆盖物数据
 * 查询一二三级覆盖物
 * @param {*} aredId 区域id
 */
export const getOverlaysById = aredId => {
  return request({
    url: `/area/map?id=${aredId}`
  })
}