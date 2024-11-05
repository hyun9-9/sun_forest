import React from 'react';
import "../assets/css/rain.css";

function RainyDayPage() {
    return (
        <>
            <div className='rainMainText'>
                비 오는 날 ☔️
            </div>
            
            <button className='rainWriting'>
                글 작성하기
            </button>
            
            <table>
                <thead> 
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회</th>
                        <th>공감</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 테이블 내용 */}
                </tbody>
            </table>
        </>
    );
}

export default RainyDayPage;
