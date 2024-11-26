import React, { useState } from "react";
import "../../assets/css/Login.css"; 
import axios from "axios";


function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post("http://your-backend-url/login", {
        email,
        password,
    });
    console.log("로그인 성공:", response.data);
    alert("로그인 성공!");
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
            <label htmlFor="email">이메일:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
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
