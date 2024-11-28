import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../assets/css/Login.css"; 
import api from "../../lib/api.js";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        loginId: "",
        password: "",
        confirmPassword: "",
        img: null, 
        memo: "",
    });
    const [error, setError] = useState("");
    const [isNameUnique, setIsNameUnique] = useState(false);
    const [isIdUnique, setIsIdUnique] = useState(false);
    const [imagePreview, setImagePreview] = useState(null); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "name") {
            checkNameUnique(value);
        }
        if (name === "loginId") {
            checkIdUnique(value);
        }
    };

    // 프로필 사진 변경 핸들러
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                img: file,
            });
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    //닉네임 중복체크
    const checkNameUnique = async (name) => {
        try {
            const response = await api.post(`/api/members/check-username`, { name });
            
            console.log('응답' , response);

            if (response) {
                setIsNameUnique(true);
                setError("사용 가능한 닉네임입니다."); 
            } else {
                setIsNameUnique(false);
                setError("이미 사용 중인 닉네임입니다.");
            }
        } catch (error) {
            console.error("닉네임 중복 확인 실패:", error);
            setError("닉네임 중복 확인 중 문제가 발생했습니다.");
        }
    };

    // 아이디 중복 체크
    const checkIdUnique = async (loginId) => {
        try {
            const response = await api.post(`/api/members/check-loginid`, { loginId });
            setIsIdUnique(response); 
            if (response) {
                setError("사용 가능한 아이디입니다.");
            } else {
                setError("이미 사용 중인 아이디입니다.");
            }
        } catch (error) {
            console.error("아이디 중복 확인 실패:", error);
            setError("아이디 중복 확인 중 문제가 발생했습니다.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 닉네임 및 아이디 중복 확인
        if (!isNameUnique) {
            setError("닉네임이 이미 사용 중입니다.");
            return;
        }
        if (!isIdUnique) {
            setError("아이디가 이미 사용 중입니다.");
            return;
        }
    
        // 비밀번호 확인 체크
        if (formData.password !== formData.confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }
    
        try {
            // 회원가입 요청 보내기 (이미지 포함 여부 확인)
            const jsonData = {
                name: formData.name,
                loginId: formData.loginId,
                password: formData.password,
                memo: formData.memo,
            };
    
            const jsonResponse = await api.post("/api/members/signup", jsonData);
            
            console.log("응답:", jsonResponse);

            console.log("응답 숫자:", jsonResponse.status);

                alert("회원가입 성공!");
                navigate("/login"); // 로그인 페이지로 이동
        } catch (error) {
            console.error(error);
            setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };
    
    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                  {/* 프로필 사진 업로드 */}
                <div className="form-group">
                    <label htmlFor="img">프로필 사진</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && <img src={imagePreview} alt="미리보기" className="image-preview" />}
                </div>

                <div className="form-group">
                    <label htmlFor="name">닉네임</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {!isNameUnique && formData.name && <p className="error-message">이미 사용 중인 닉네임입니다.</p>}
                        {isNameUnique && formData.name && <p className="success-message">사용 가능한 닉네임입니다.</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="loginId">아이디</label>
                    <input
                        type="text"
                        id="loginId"
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleChange}
                        required
                    />
                    {!isIdUnique && formData.loginId && <p className="error-message">이미 사용 중인 아이디입니다.</p>}
                    {isIdUnique && formData.loginId && <p className="error-message">사용 가능한 아이디입니다.</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="memo">소개</label>
                    <input
                        type="text"
                        id="memo"
                        name="memo"
                        value={formData.memo}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* {error && <p className="error-message">{error}</p>} */}
                <button type="submit" disabled={!isNameUnique || !isIdUnique}>회원가입</button>
            </form>
        </div>
    );
}

export default SignUp;
