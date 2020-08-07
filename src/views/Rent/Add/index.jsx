import React, { Component } from 'react'
import MyNavBar from '../../../components/MyNavBar'
import { List, ImagePicker, InputItem, Picker, TextareaItem, Flex, Toast, Modal } from 'antd-mobile';
import styles from './index.module.scss'
import HouseMatch from '../../../components/HouseMatch'
import { connect } from 'react-redux'
import { uploadImage, publishHouse } from '../../../api/rent'

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

export default connect(
  // mapStateToProps
  ({ community, communityName }) => ({
    community, communityName
  })
)(
  class RentAdd extends Component {

    constructor(props) {
      super(props)
      this.state = {
        community: this.props.community ?? '',
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

    // 取消
    cancel = () => {
      Modal.alert('提示', '放弃发布房源?', [
        { text: '放弃', onPress: () => this.props.history.goBack() },
        { text: '继续编辑', onPress: () => null },
      ]);
    }

    // 提交
    submit = async () => {
      // community, // 小区名称  files, // 放的就是我们选择的   title, // 标题   description, // 描述  oriented, // 朝向  supporting, // 房屋配置套 price, // 租金 roomType, // 房屋的类型  size, // 建筑面积 floor // 楼层} 
      const { community, files, title, price, size, roomType, supporting, floor, oriented, description } = this.state

      if (!community) {
        Toast.info('小区名称不能为空', 1.5)
        return
      }
      if (!files) {
        Toast.info('房屋图片不能为空', 1.5)
        return
      }
      if (!title) {
        Toast.info('房屋标题不能为空', 1.5)
        return
      }
      if (!price) {
        Toast.info('房屋价格不能为空', 1.5)
        return
      }
      if (!size) {
        Toast.info('建筑面级不能为空', 1.5)
        return
      }
      if (!roomType) {
        Toast.info('房屋类型不能为空', 1.5)
        return
      }
      if (!supporting) {
        Toast.info('房屋配套不能为空', 1.5)
        return
      }
      if (!floor) {
        Toast.info('房屋楼层不能为空', 1.5)
        return
      }
      if (!oriented) {
        Toast.info('房屋朝向不能为空', 1.5)
        return
      }
      if (!description) {
        Toast.info('房屋描述不能为空', 1.5)
        return
      }

      // 先做上传文件
      const { data } = await uploadImage(files)
      console.log(data)

      if (data.status === 200) {
        // 在做发布房源
        const requestData = { community, title, price, size, roomType, supporting, floor, oriented, description, houseImg: data.body.join('|') }
        const res2 = await publishHouse(requestData)
        if (res2.data.status === 200) {
          Toast.info('发布房源成功~', 1.5, () => this.props.history.replace('/rent'))
        } else {
          Toast.info('服务器异常', 1.5)
        }
      }
    }


    render () {
      const { files, title, price, size, roomType, floor, oriented, description } = this.state
      const { community, communityName } = this.props
      return (
        <div className={styles.root}>
          <MyNavBar>发布房源</MyNavBar>
          <List renderHeader={() => '房源信息'}>
            <List.Item
              arrow="horizontal"
              extra={communityName ?? '请输入小区名称'}
              onClick={() => {
                this.props.history.push('/rent/search')
              }}
            >
              小区名称
          </List.Item>
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
              <div className={styles.cancel} onClick={this.cancel}>取消</div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles.confirm} onClick={this.submit}>提交</div>
            </Flex.Item>
          </Flex>
        </div>
      )
    }
  }
)