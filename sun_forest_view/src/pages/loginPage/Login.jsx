import React, { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import "../../assets/css/Login.css"; 
import api from "../../lib/api.js";


function Login () {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        const response = await api.post(`/api/members/login` ,  { loginId, password }  );

        console.log("로그인 성공:", response.loginId);

        console.log("로그인 pk :", response.id);
    
        localStorage.setItem("loginpk",  response.id);

        console.log("localstorage", localStorage.getItem("loginpk"));

        alert("로그인 성공!");

        navigate("/");
        window.location.reload();
    } catch (error) {
    
        console.error("로그인 실패:", error);
    
        alert("로그인 실패!");
        }
};


    return (
    <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
        <div className="form-group">
            <label htmlFor="loginId">아이디:</label>
            <input
            type="loginId"
            id="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="아이디 입력"
            required
        />
        </div>
        <div className="form-group">
            <label htmlFor="password">비밀번호:</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            required
        />
        </div>
        <button type="submit" className="login-button">로그인</button>
    </form>
    </div>
    );
};

export default Login;
