import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

function HouseItem ({ houseCode, houseImg, title, desc, tags, price, history }) {
  return <div className={styles.house} onClick={() => history.push(`/detail/${houseCode}`)}>
    <div className={styles.imgWrap}>
      <img className={styles.img} src={`${process.env.REACT_APP_BASHURL}${houseImg}`} alt={title} />
    </div>
    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.desc}>{desc}</div>
      <div>
        {tags && tags.map((item, index) => {
          const tagName = `tag${(index % 3) + 1}`
          return <span key={index} className={classNames(styles.tag, styles[tagName])}>{item}</span>
        })}
      </div>
      <div className={styles.price}><span className={styles.priceNum}>{price}</span>元/月</div>
    </div>
  </div>
}

export default withRouter(HouseItem)