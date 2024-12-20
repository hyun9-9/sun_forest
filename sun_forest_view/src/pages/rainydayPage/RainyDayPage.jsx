import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/rain.css";
import axios from 'axios';

function RainyDayPage() {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/posts/rainydays')
            .then(response => {
                // 오름차순 정렬
                const sortedPosts = response.data.sort((a, b) => a.postId - b.postId);
                setPosts(sortedPosts);
            })
            .catch(error => {
                console.error("fetch error", error);
            });
    }, []);

    const handleWriteClick = () => { //글 작성 
        navigate('/write'); 
    };

    const handleTitleClick = (postId) => { //글 세부내용
        navigate(`/rainydays/${postId}`);
    };
    
    return (
        <>
            <div className='rainMainText'>
                비 오는 날 ☔️
            </div>
            
            <button className='rainWriting' onClick={handleWriteClick}>
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
                    <tr key={index} onClick={() => handleTitleClick(post.postId)} style={{ cursor: "pointer" }}>
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
