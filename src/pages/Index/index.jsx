import React from 'react'
import axios from 'axios'
import { Swiper, Toast, Grid } from 'antd-mobile'

import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

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
      <Grid columns={4} gap={3}>
        <Grid.Item>
          <div className={styles['iconBars']}>
            <img src={nav1} />
            <h2>整租</h2>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles['iconBars']}>
            <img src={nav2} />
            <h2>合租</h2>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles['iconBars']}>
            <img src={nav3} />
            <h2>地图找房</h2>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles['iconBars']}>
            <img src={nav4} />
            <h2>出租</h2>
          </div>
        </Grid.Item>
      </Grid>
    </div>
  )
}
