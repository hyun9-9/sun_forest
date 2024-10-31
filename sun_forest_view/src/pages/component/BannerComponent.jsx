import React, {useEffect, useState} from "react";
import squirrellogo from "../../assets/img/squirrellogo.png"; 
import { useMediaQuery } from 'react-responsive';
import "../../assets/css/Main.css";
import Modal from "./Modal";

export default function Banner({memberId}) {

    console.log('[로그]' , memberId);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const[imag, setImag] = useState(null);
    const [nickname, setNickname] = useState(null); 
    const [memo, setMemo] = useState(null); 

    const isMobile = useMediaQuery({ query: '(max-width: 760px' });
    const isDesktop = useMediaQuery({ query: '(min-width: 761px)' });

    useEffect(() => {
        console.log('[로그 1 ]', memberId); 
        const fetchImage = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/members/${memberId}/img`);
            console.log(response);
            if (response.ok) {
                const imagePath = await response.text(); 
                console.log('응답', imagePath)
                setImag(imagePath); 
            }
            const nicknameResponse = await fetch(`http://localhost:8080/api/members/${memberId}/name`);
            console.log('이름 있는지', nicknameResponse)
            if (nicknameResponse.ok) {
                const nicknameData = await nicknameResponse.text();
                console.log('닉네임', nicknameData)
                setNickname(nicknameData);
            }
            const memoResponse = await fetch(`http://localhost:8080/api/members/${memberId}/memo`);
            console.log('메모 있는지', memoResponse)
            if (memoResponse.ok) {
                const memoData = await memoResponse.text();
                console.log('닉네임', memoData)
                setMemo(memoData);
            }
        } catch (error) {
            console.error("프로필 데이터를 가져오는 중 오류 발생:", error);
        }
        };
            fetchImage();
    
    }, [memberId]); 

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const nickNameResponse = await fetch(`http://localhost:8080/api/members/${memberId}/name`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nickname),
            });

            if (nickNameResponse.ok) {
                console.log("닉네임이 성공적으로 저장되었습니다.");
            } else {
                console.error("닉네임 저장에 실패했습니다.");
            }

            const memoResponse = await fetch(`http://localhost:8080/api/members/${memberId}/memo`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(memo),
            });

            if (memoResponse.ok) {
                console.log("메모가 성공적으로 저장되었습니다.");
            } else {
                console.error("메모 저장에 실패했습니다.");
            }
        } catch (error) {
            console.error("메모 저장 중 오류 발생:", error);
        }
    };


    return (
        <div className='banner'>
            {isDesktop && 
                <img className='desk' alt="bannerPicture" src={squirrellogo} />
            }

            {isMobile && 
            <img className='mobile' alt="bannerPicture" src={squirrellogo} />}

<div className ='profilebox'>
                <img
                    src={`http://localhost:8080${imag}`}
                    alt="Overlay"
                    className='profile'
                    onClick={openModal}
                />
            </div>

            <div>

    <Modal isOpen={isModalOpen} closeModal={closeModal} >
    <div style={{ border: '1px solid black', height: '300px'}}>
                프로필 사진 들어갈 자리

    </div>
        <br />

    <form onSubmit={handleSubmit}>
            <label htmlFor="nickname">닉네임: </label>
            <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
            />

            <label htmlFor="nickname">소개 : </label>
            <input
                id="memo"
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                required
            />
            <button type="submit">저장</button>
        </form>


    {/* <button> 확인 </button>
    <button> 취소 </button> */}
    </Modal>
    </div>
        </div>
    );
}
