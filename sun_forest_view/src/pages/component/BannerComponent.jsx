import React, { useEffect, useState } from "react";
import squirrellogo from "../../assets/img/squirrellogo.png"; 
import { useMediaQuery } from 'react-responsive';
import "../../assets/css/Main.css";
import Modal from "./Modal";

export default function Banner({ memberId }) {
    console.log('[로그]', memberId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imag, setImag] = useState(null);
    const [nickname, setNickname] = useState("");
    const [memo, setMemo] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(""); 
    const [fileName, setFileName] = useState(""); // 파일 이름 상태 추가

    const openModal = () => {
        console.log('모달 열림:', fileName);
        setIsModalOpen(true);
        setFile(null); // 모달 열 때 파일 초기화
        setFileName(""); // 파일 이름 초기화
    };
    
    const closeModal = () => {
        console.log('모달 닫힘, 파일 초기화됨:', fileName);
        setIsModalOpen(false);
        setFile(null);
        setPreview(""); // 미리보기 초기화
        setFileName(""); // 파일 이름 초기화
        document.getElementById('file').value = ""; //파일이름 초기화
    };
    
    const closeSaveModal = () => {
        console.log('모달 닫힘:', fileName);
        setIsModalOpen(false);
    };

    const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 761px)' });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // 이미지 가져오기
                const imageResponse = await fetch(`http://localhost:8080/api/members/${memberId}/img`);
                if (imageResponse.ok) {
                    const imagePath = await imageResponse.text();
                    setImag(imagePath);
                }

                // 닉네임 가져오기
                const nicknameResponse = await fetch(`http://localhost:8080/api/members/${memberId}/name`);
                if (nicknameResponse.ok) {
                    const nicknameData = await nicknameResponse.text();
                    setNickname(nicknameData);
                }

                // 메모 가져오기
                const memoResponse = await fetch(`http://localhost:8080/api/members/${memberId}/memo`);
                if (memoResponse.ok) {
                    const memoData = await memoResponse.text();
                    setMemo(memoData);
                }
            } catch (error) {
                console.error("프로필 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        fetchProfileData();
    }, [memberId]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        
        // 파일이 선택되면 미리보기 상태 업데이트
        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                console.log('파일 선택 1')
                setPreview(fileReader.result); // 파일 미리보기
            };
            fileReader.readAsDataURL(selectedFile);
            setFileName(selectedFile.name); // 선택된 파일 이름 업데이트
        } else {
            console.log('파일 초기화2')
            setPreview(""); // 파일이 없을 경우 미리보기 초기화
            setFileName(""); // 파일 이름 초기화
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // 닉네임 업데이트
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

            // 메모 업데이트
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

            // 이미지 파일 업로드
            if (file) {
                const formData = new FormData();
                formData.append("file", file); // 파일 추가

                const imageUploadResponse = await fetch(`http://localhost:8080/api/members/${memberId}/img`, {
                    method: "PUT",
                    body: formData,
                });

                if (imageUploadResponse.ok) {
                    console.log("이미지가 성공적으로 업로드되었습니다.");
                } else {
                    console.error("이미지 업로드에 실패했습니다.");
                }
            }

        } catch (error) {
            console.error("정보 저장 중 오류 발생:", error);
        }
    };

    return (
        <div className='banner'>
            {isDesktop && 
                <img className='desk' alt="bannerPicture" src={squirrellogo} />
            }

            {isMobile && 
                <img className='mobile' alt="bannerPicture" src={squirrellogo} />
            }

            <div className='profilebox'>
                <img
                    src={preview || `http://localhost:8080${imag}`} // 미리보기 없으면 원래 이미지 사용
                    alt="Overlay"
                    className='profile'
                    onClick={openModal}
                />
            </div>

            <div>
                <Modal isOpen={isModalOpen} closeModal={closeModal}>

                    <form onSubmit={handleSubmit}>
                        <div style={{  height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src={preview || `http://localhost:8080${imag}`} 
                                alt="Preview"
                                style={{ maxHeight: '100%', maxWidth: '100%' }} 
                            />
                        </div>
                        <br />
                        <label htmlFor="file">프로필 사진 업로드: </label>
                        <input
                            id="file"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange} 
                        />
                        
                        <label htmlFor="nickname">닉네임: </label>
                        <input
                            id="nickname"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        />

                        <label htmlFor="memo">소개: </label>
                        <input
                            id="memo"
                            type="text"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            required
                        />
                        <div className="button-group">
                            <button type="submit" onClick={closeSaveModal}>저장</button>
                            <button type="button" onClick={closeModal}>취소</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}
