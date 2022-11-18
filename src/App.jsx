import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import './App.less'

// 路由页面
import Home from './pages/Home'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='home/*' element={<Home />} />
        <Route path='/' element={<Navigate to='/home' />} />
      </Routes>
    </div>
  )
}
