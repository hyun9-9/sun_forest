import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/nav.css'

export default function Navbar() {

    const [loginId, setLoginId] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedLoginId = localStorage.getItem("loginId");
        if (storedLoginId) {
            setIsLoggedIn(true);
            setLoginId(storedLoginId);  
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loginId");  
        setIsLoggedIn(false);
        alert("로그아웃되었습니다.");
        navigate("/");
    };





    return (
    <>
    <div className='nav'> 
        <div className='child-nav my-nav'>
            <h4>마이페이지</h4>
            <hr/>
            <Link to="/bookmark">북마크</Link>
            <Link to="/note">마음 속 노트</Link>
        </div>

        <div className='child-nav sunforest-nav'>
            <h4>햇살숲</h4>
            <hr/>
            <Link to="/rainy-day">비오는날</Link>
            <Link to="/sunny-day">햇살가득</Link>
        </div>

        <div className='child-nav helper-nav'>
            <h4>도우미</h4>
            <hr/>
            <Link to="/notices">공지사항</Link>
            <Link to="/inquiry">문의사항</Link>
        </div>

        <div className='child-nav shop-nav'>
        <hr/>
        <Link to="/shop">상점</Link>
        </div>

        
        <div className='child-nav login-nav'>
        <hr />
            {isLoggedIn ? (
            <Link to="#" className="logout" onClick={handleLogout}>로그아웃</Link>  
        ) : (
            <Link to="/login">로그인</Link> 
        )}
        </div>
    </div>
    <p> </p>
    </>
    );
}

