/**
 * 出租相关操作
 */

import request from '../utils/request'

/**
 * 获取已发布房源
 */
export const getMyRentList = () => request({
  url: 'user/houses'
})

/**
 * 小区关键词查询
 * @param {*} id 当前定位城市id
 * @param {*} name 关键词
 */
export const getCommunity = (id, name) => request({
  url: 'area/community',
  params: {
    id, name
  }
})

/**
 * 上传房屋图片
 * @param {*} files 文件
 */
export const uploadImage = files => {
  const formData = new FormData()
  files.forEach(item => {
    formData.append('file', item.file)
  })
  return request({
    url: 'houses/image',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 发布房源
 * @param {*} data 房源信息
 */
export const publishHouse = data => request({
  url: 'user/houses',
  method: "POST",
  data
})