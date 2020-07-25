/**
 * 定位城市模块
 */
import { getCityInfo } from '../api/city'
const STORAGE_CITYKEY = 'current_city'
const setLocalCity = city => {
  window.localStorage.setItem(STORAGE_CITYKEY, JSON.stringify(city))
}
const getLocalCity = () => window.localStorage.getItem(STORAGE_CITYKEY)
export const getCurrentCity = () => {
  // 从需求处分析：没有思路的时候，看调用的时候需要什么东西，然后考虑这边需要返回什么信息
  // 这里面无论如何处理，最终都要返回一个promise，并且最终Promise resolve出去的就是一个城市对象
  // 1.先从本地去取，看能否取到，如果取到了，则通过Promise.resolve 直接返回给调用者
  // 2.如果本地没有，调用百度地图的定位API，获取城市信息（只有城市名，没有value），在进一步发请求请求自己的接口，去获取数据。 获取完数据之后，需要做两件事情：  2.1 把它保存到本地，方便下次获取。 2.2 别忘记把返回的数据通过resolve返回给调用者
  const localCity = getLocalCity()
  if (localCity) {
    // 本地有值
    // return new Promise((resolve, reject) => {
    //   resolve(JSON.parse(localCity))
    // })
    // 简写: 明确知道结果===>直接通过resolve传递正确的结果
    return Promise.resolve(JSON.parse(localCity))
  } else {
    // 本地没有值
    return new Promise((resolve, reject) => {
      // 1.调用百度地图定位的api，获取城市名 ===>注意：脚手架规定，需要加window

      var myCity = new window.BMap.LocalCity();
      myCity.get(async result => {
        // 2.根据城市名字，调用我们自己后台的接口，返回城市数据（包含的value）
        const { data } = await getCityInfo(result.name)
        // console.log('=========', result, data)
        // 3.把它保存到本地 & 通过resolve返回给调用者
        setLocalCity(data.body)
        resolve(data.body)
      });
    })
  }
}