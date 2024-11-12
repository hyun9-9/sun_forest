import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../lib/api.js";

function RainyDayDetailPage() {
    const { postId } = useParams(); // URL에서 postId 파라미터를 가져옵니다.
    const [post, setPost] = useState(null);

    console.log("postId:", postId); // 확인용

    useEffect(() => {
        const postDetailData = async () => {
            try {
                console.log(`Fetching post with ID: ${postId}`);
                const detailPost = await api.get(`/api/posts/rainydays/${postId}`);
                setPost(detailPost.data);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }
        };
        postDetailData();
    }, [postId]);

    if (!post) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><strong>작성자:</strong> {post.memberName}</p>
            <p><strong>작성일:</strong> {new Date(post.regDate).toLocaleDateString()}</p>
            <p><strong>조회:</strong> {post.visit}</p>
            <p><strong>공감:</strong> {post.reactionNum}</p>
        </div>
    );
}

export default RainyDayDetailPage;
