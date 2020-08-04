import React, { Component } from 'react'
import MyNavBar from '../../../components/MyNavBar'
import { List, ImagePicker, InputItem, Picker, TextareaItem, Flex } from 'antd-mobile';
import styles from './index.module.scss'
import HouseMatch from '../../../components/HouseMatch'



// 房屋类型
const roomTypeData = [
  { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
]

// 楼层
const floorData = [
  { label: '高楼层', value: 'FLOOR|1' },
  { label: '中楼层', value: 'FLOOR|2' },
  { label: '低楼层', value: 'FLOOR|3' }
]

// 朝向：
const orientedData = [
  { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
]

export default class RentAdd extends Component {

  constructor() {
    super()
    this.state = {
      files: [], // 放的就是我们选择的图片
      title: '', // 标题
      description: '', // 描述
      //houseImg: "img1|im2|img3", // 最终上传时候的图片
      oriented: '', // 朝向
      supporting: '', // 房屋配置套
      price: '', // 租金
      roomType: '', // 房屋的类型
      size: '', // 建筑面积
      floor: '' // 楼层
    }
  }

  changeVal = (type, val) => {
    this.setState({
      [type]: val
    })
  }
  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files
    })
  }

  changeSupporting = data => {
    // console.log('data===', data)
    this.setState({
      supporting: data
    })
  }

  render () {
    const { files, title, price, size, roomType, floor, oriented, description } = this.state
    return (
      <div className={styles.root}>
        <MyNavBar>发布房源</MyNavBar>
        <List renderHeader={() => '房源信息'}>
          <List.Item arrow="horizontal" extra={('请输入小区名称')}>小区名称</List.Item>
          <InputItem onChange={val => this.changeVal('price', val)} value={price} placeholder="请输入租金/月" extra={('￥/月')}>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</InputItem>
          <InputItem onChange={val => this.changeVal('size', val)} value={size} placeholder="请输入建筑面积" extra={('㎡')}>建筑面积</InputItem>
          <Picker data={roomTypeData} onChange={val => this.changeVal('roomType', val[0])} value={[roomType]} placeholder="请选择" cols={1}>
            <List.Item arrow="horizontal">户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</List.Item>
          </Picker>
          <Picker data={floorData} onChange={val => this.changeVal('floor', val[0])} value={[floor]} placeholder="请选择" cols={1}>
            <List.Item arrow="horizontal">所在楼层</List.Item>
          </Picker>
          <Picker data={orientedData} onChange={val => this.changeVal('oriented', val[0])} value={[oriented]} placeholder="请选择" cols={1}>
            <List.Item arrow="horizontal">朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</List.Item>
          </Picker>
        </List>
        <List renderHeader={() => '房屋标题'}>
          <InputItem onChange={val => this.changeVal('title', val)} value={title} placeholder="请输入标题（例如：整租 小区名 2室 5000元）"></InputItem>
        </List>
        <List renderHeader={() => '房屋头像'}>
          <ImagePicker
            className={styles.imgpicker}
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 5}
            length='3'
            multiple
          />
        </List>
        <List className={styles.supporting} renderHeader={() => '房屋配置'}>
          <HouseMatch onChange={this.changeSupporting} readonly={false} />
        </List>
        <List className={styles.desc} renderHeader={() => '房屋描述'}>
          <TextareaItem
            placeholder="请输入房屋描述"
            autoHeight
            rows={5}
            value={description}
            onChange={val => this.changeVal('description', val)}
          />
        </List>
        <Flex className={styles.bottom}>
          <Flex.Item>
            <div className={styles.cancel}>取消</div>
          </Flex.Item>
          <Flex.Item>
            <div className={styles.confirm}>提交</div>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
