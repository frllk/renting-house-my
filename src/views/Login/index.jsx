import React, { Component } from 'react'
import styles from './index.module.scss'
import MyNavBar from '../../components/MyNavBar'
import { WingBlank, WhiteSpace, Flex, Toast } from 'antd-mobile';
import { login } from '../../api/user'
import { setToken } from '../../utils/token'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  changeInpVal = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // 用户登录
  userLogin = async () => {
    const { data } = await login(this.state)
    if (data.status === 400) {
      Toast.info(data.description, 1.5)
      return
    }
    Toast.info(data.description, 1)
    // 1.保存到本地
    setToken(data.body.token)
    // 2.返回上个页面
    this.props.history.goBack(-1)
  }

  render () {
    const { username, password } = this.state
    return <div className={styles.root}>
      <MyNavBar>账号登录</MyNavBar>
      <WhiteSpace size="xl" />
      <WingBlank size="lg">
        <div className={styles.formItem}>
          <input type="text" className={styles.input} name='username' value={username} onChange={this.changeInpVal} placeholder="请输入账号" />
        </div>
        <div className={styles.formItem}>
          <input type="password" className={styles.input} name='password' value={password} onChange={this.changeInpVal} placeholder="请输入密码" />
        </div>
        <div className={styles.formSubmit}>
          <input type="submit" onClick={this.userLogin} className={styles.submit} value="登录" />
        </div>
        <Flex className={styles.backHome}>
          <Flex.Item>
            <a href="/">还没有账号，去注册~</a>
          </Flex.Item>
        </Flex>
      </WingBlank>
    </div>
  }
}

export default Login