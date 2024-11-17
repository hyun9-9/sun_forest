import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import BannerComponent from "./pages/component/BannerComponent";
import NavbarComponent from "./pages/component/NavbarComponent";
import BookmarkPage from './pages/BookmarkPage';
import NotePage from './pages/notePage/NotePage';
import RainyDayPage from './pages/RainyDayPage';
import RainyDayWriter from './pages/RainyDayWriter';
import RainyDayDetailPage from './pages/RainyDayDetailPage';
// import SunnyDayPage from './pages/SunnyDayPage';
// import NoticesPage from './pages/NoticesPage';
// import InquiryPage from './pages/InquiryPage';   
import './App.css'; 

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
            {/* <Route exact path='/my' element={<MyPage />} /> */}
            <Route path="/bookmark" element={<BookmarkPage />} />
            <Route path="/note" element={<NotePage />} />
            <Route path="/rainy-day" element={<RainyDayPage />} />
            <Route path="/write" element={<RainyDayWriter />} />
            <Route path="/rainydays/:postId" element={<RainyDayDetailPage />} />
            {/* <Route path="/sunny-day" element={<SunnyDayPage />} /> */}
            {/* <Route path="/notices" element={<NoticesPage />} /> */}
            {/* <Route path="/inquiry" element={<InquiryPage />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
