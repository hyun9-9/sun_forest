import React, {Component} from "react";
import '../../assets/css/nav.css'

export default function Navbar() {


    return (
    <>
    <div class='nav'> 
        <div class='child-nav my-nav'>
            <h4>마이페이지</h4>
            <hr/>
            <div>북마크</div>
            <div>마음 속 노트</div>
        </div>
        {/* <hr/> */}
        <div class='child-nav sunforest-nav'>
            <h4>햇살숲</h4>
            <hr/>
            <div>비오는날</div>
            <div>햇살가득</div>
        </div>
        {/* <hr/> */}
        <div class='child-nav helper-nav'>
            <h4>도우미</h4>
            <hr/>
            <div>공지사항</div>
            <div>문의사항</div>
        </div>
        {/* <hr/> */}
        <div class='child-nav shop-nav'></div>
    </div>
    <p> </p>
    </>
    );
}

