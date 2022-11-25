import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { TabBar } from 'antd-mobile'
import {
  AppOutline,
  SearchOutline,
  TextOutline,
  UserOutline,
} from 'antd-mobile-icons'

import Index from '../Index'
import House from '../House'
import News from '../News'
import Mine from '../Mine'

import styles from './index.module.less'

export default function Home() {
  const tabs = [
    {
      key: 'index',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: 'house',
      title: '找房',
      icon: <SearchOutline />,
    },
    {
      key: 'news',
      title: '资讯',
      icon: <TextOutline />,
    },
    {
      key: 'mine',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  const navigate = useNavigate()

  const [activeKey, setActiveKey] = React.useState('index')
  const location = useLocation()

  React.useEffect(() => {
    if (location.pathname === '/home/house') {
      setActiveKey('house')
    }
  }, [location.pathname])

  const changeTabsRouter = value => {
    if (value === 'index') {
      navigate('/home')
    } else {
      navigate(value)
    }
    setActiveKey(value)
  }

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='house' element={<House />} />
          <Route path='news' element={<News />} />
          <Route path='mine' element={<Mine />} />
        </Routes>
      </div>
      <div className={styles.tabs}>
        <TabBar activeKey={activeKey} onChange={changeTabsRouter}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} /> 
          ))}
        </TabBar>
      </div>
    </div>
  )
}
