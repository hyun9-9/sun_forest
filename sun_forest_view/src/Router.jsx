import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import BannerComponent from "./pages/component/BannerComponent";
import NavbarComponent from "./pages/component/NavbarComponent";
import './App.css'; // 스타일 파일 추가

export default function Router() {
  const memberId = 1;

  return (
    <BrowserRouter>
    <BannerComponent memberId={memberId} />
      <div className="layout">
        <NavbarComponent memberId={memberId} />
        <div className="content">
          
          <Routes>
            <Route exact path='/' element={<MainPage />} />
            <Route exact path='/my' element={<MyPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
