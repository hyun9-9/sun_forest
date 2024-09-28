import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import BannerComponent from "./pages/component/BannerComponent";

export default function Router() {
  return (
    <BrowserRouter>
      <BannerComponent/>
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route exact path='/my' element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}