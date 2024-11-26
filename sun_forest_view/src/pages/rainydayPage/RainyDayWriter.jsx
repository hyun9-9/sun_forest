import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/rain.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function RainyDayWriter() {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const [selectedOption, setSelectedOption] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState("");

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        setCategory(e.target.value); 
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value); 
    };


    const requestBody = {
        gubun: category,
        title,
        content,
        memberId: localStorage.getItem("memberId"), 
    };

    console.log('requestBody',requestBody);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const categoryResponse = await fetch(`http://localhost:8080/api/posts/myNotes/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            // const categoryResponse = await api.post(`/api/posts/myNotes/save`, requestBody);

            console.log("Response Status:", categoryResponse.ok);

            if (categoryResponse.ok) {
                console.log("카테고리 성공적으로 저장되었습니다.");
                const responseData = await categoryResponse.json(); // 서버 응답을 JSON으로 파싱
                console.log("Response Data:", responseData);

                navigate(-1); // `-1`은 이전 페이지로 이동
            } else {
                console.error("카테고리 저장에 실패했습니다.");
            }
        } catch (error) {
            console.error("정보 저장 중 오류 발생:", error);
        }
    };

    return (
        <>
            <div className='writebanner'> 글 작성 </div>
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className='dropdownContainer'>
                    <select 
                        id="categoryDropdown" 
                        value={selectedOption} 
                        onChange={handleSelectChange} 
                        className='styledDropdown'
                    >
                        <option value="">카테고리를 선택하세요</option>
                        <option value="햇살숲">햇살숲</option>
                        <option value="비오는날">비오는날</option>
                    </select>

                    <input 
                        type="text" 
                        placeholder="제목을 입력하세요" 
                        value={title} 
                        onChange={handleTitleChange} 
                    />

                    <div className="buttonWrite">
                        <button type="submit">저장</button>
                    </div>
                </div>


                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        placeholder: "내용을 입력하세요.",
                    }}
                    onReady={(editor) => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data); 
                    }}
                />
            </form>
        </>
    );
}

export default RainyDayWriter;
