import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.less";

// 路由
import Home from "./pages/Home";
import CityList from "./pages/CityList";
import Map from "./pages/Map";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="home/*" element={<Home />} />
        <Route path="/citylist" element={<CityList />} />
        <Route path="/map" element={<Map />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}
