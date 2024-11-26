import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../lib/api.js";
import "../../assets/css/rain.css";

function RainyDayDetailPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [imag, setImag] = useState(null);
    const [nickname,setNickname] = useState(null);

    console.log("postId:", postId); 

    useEffect(() => {
        const postDetailData = async () => {
            try {
                console.log(`Fetching post with ID: ${postId}`);
                const detailPost = await api.get(`/api/posts/RainyPost/${postId}`);
                setPost(detailPost);
                console.log("detailPost:", detailPost); 

                const memberId = detailPost.memberId; 

                const members = await api.get(`/api/members/${memberId}`);

                console.log('image 응답', members.img);

                // const name = await api.get(`/api/members/${memberId}/name`);

                console.log('name 응답', members.name );

                setImag(members.img);
                setNickname(members.name );

                console.log('img', members.img);
                console.log('name',members.name );

            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }
        };
        postDetailData();
    }, [postId]);


    if (!post) {
        console.log("log", post);
        return <div>로딩 중...</div>;
    }

    return (
        <>
<div className="image-container">
    <div>
        <h2 className='rainPostPage'> ▶ {post.gubun}</h2>
        <h2 className='rainPostTitle'>{post.title}</h2>
        <div className="image-nickname-container">
            <img className='writerImg' src={`http://localhost:8080${imag}`} alt="rainImage" />
            <p className='nicknamestyle'>{nickname}</p>
            <p className='datestyle'>{new Date(post.regDate).toLocaleDateString()}</p>

            <p className="post-stats">
            <strong>조회:</strong> {post.visit} <span> | </span>
            <strong>공감:</strong> {post.reactionNum}
            </p>
        </div>
    </div>
</div>
        <div className='post-rules'>
        비방금지
        주제와 맞지 않는 글은 통보없이 삭제될 수 있습니다.


        </div>

        {/* <p className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} /> */}
        <p className="post-content">
            {post.content
                .replace(/<p>/g, '\n')
                .replace(/<\/p>/g, '')
                .replace(/&nbsp;/g, ' ')
                .split("\n")
                .map((line, index) => (
        <React.Fragment key={index}>
                {line}
        <br />
        </React.Fragment>
        ))}
        </p>
        <strong> 댓글 </strong>
        </>
    );
}

export default RainyDayDetailPage;
