import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Main from "./pages/Main";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}