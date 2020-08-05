import React, { Component } from 'react'
import Brother1 from './Brother1'
import Brother2 from './Brother2'
import { Flex } from 'antd-mobile'

export default class Index extends Component {
  render () {
    return (
      <div>
        react-redux
        <br />
        <br />
        <br />
        <Flex>
          <Flex.Item><Brother1 /></Flex.Item>
          <Flex.Item><Brother2 /></Flex.Item>
        </Flex>
      </div>
    )
  }
}
