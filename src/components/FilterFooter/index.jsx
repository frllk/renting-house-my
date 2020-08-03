import React from 'react';
import styles from './index.module.scss'
import { Flex } from 'antd-mobile'
import classNames from 'classnames'

/**
 * 抽取的筛选组件底部公共部分
 */
function FilterFooter ({ cancelText, sureText, onCancel, onOk }) {
  return (
    <Flex className={styles.root}>
      <span className={classNames(styles.btn, styles.cancel)} onClick={onCancel}>{cancelText}</span>
      <span className={classNames(styles.btn, styles.ok)} onClick={onOk}>{sureText}</span>
    </Flex>
  );
}

FilterFooter.defaultProps = {
  cancelText: '取消',
  sureText: '确定'
}

export default FilterFooter