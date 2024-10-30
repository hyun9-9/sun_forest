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
        } catch (error) {
            console.error("프로필 데이터를 가져오는 중 오류 발생:", error);
        }
        };
            fetchImage();
    
    }, [memberId]); 

    

    // const imagSize = isDesktop ? 100 : 60;

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
    <div>
        닉네임 : {`${nickname}`}
    </div>

    <br />
    <div>
        소개 
    </div>

    </Modal>
    </div>
        </div>
    );
}
