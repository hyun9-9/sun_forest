import React from "react";
import { Link } from 'react-router-dom';
import '../../assets/css/nav.css'

export default function Navbar() {


    return (
    <>
    <div class='nav'> 
        <div class='child-nav my-nav'>
            <h4>마이페이지</h4>
            <hr/>
            <Link to="/bookmark">북마크</Link>
            <Link to="/note">마음 속 노트</Link>
        </div>

        <div class='child-nav sunforest-nav'>
            <h4>햇살숲</h4>
            <hr/>
            <Link to="/rainy-day">비오는날</Link>
            <Link to="/sunny-day">햇살가득</Link>
        </div>

        <div class='child-nav helper-nav'>
            <h4>도우미</h4>
            <hr/>
            <Link to="/notices">공지사항</Link>
            <Link to="/inquiry">문의사항</Link>
        </div>

        <div class='child-nav shop-nav'>
        <Link to="/shop">상점</Link>
        </div>
    </div>
    <p> </p>
    </>
    );
}

