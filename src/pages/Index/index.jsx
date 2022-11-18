import React from 'react'
import axios from 'axios'
import { Swiper, Toast } from 'antd-mobile'

import styles from './index.module.less'

export default function Index() {
  React.useEffect(() => {
    getSwipers()
  }, [])

  const [swipers, setSwipers] = React.useState([])
  const getSwipers = async () => {
    const res = await axios.get('http://127.0.0.1:8080/home/swiper')
    setSwipers(res.data.body)
  }

  const items = swipers.map((swiper, index) => (
    <Swiper.Item key={index}>
      <div
        className={styles.content}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`)
        }}>
        <img
          src={`http://localhost:8080${swiper.imgSrc}`}
          alt=''
          style={{ width: '100%', verticalAlign: 'top' }}
        />
      </div>
    </Swiper.Item>
  ))

  return (
    <div>
      <Swiper autoplay loop autoplayInterval={5000}>
        {items}
      </Swiper>
    </div>
  )
}
