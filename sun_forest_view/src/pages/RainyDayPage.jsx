import React, { useEffect, useState } from 'react';
import "../assets/css/rain.css";
import axios from 'axios';

function RainyDayPage() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/posts/rainydays')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("fetch error", error);
            });
    }, []);
    
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
                    {posts.map((post, index) => (
                        <tr key={index}>
                            <td>{post.postId}</td>
                            <td>{post.title}</td>
                            <td>{post.memberName}</td>
                            <td>{new Date(post.regDate).toLocaleDateString()}</td>
                            <td>{post.visit}</td>
                            <td>{post.reactionNum}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default RainyDayPage;
