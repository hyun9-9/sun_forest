import React, { useState } from 'react';
import "../assets/css/rain.css";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function RainyDayWriter() {
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        
            // 카테고리
            const categoryResponse = await fetch(`http://localhost:8080/api/posts/gubun`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category,
                    title,
                    content,
                }),
            });

            if (categoryResponse.ok) {
                console.log("카테고리 성공적으로 저장되었습니다.");
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

            <form onSubmit={handleSubmit}>
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
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </form>
        </>
    );
}

export default RainyDayWriter;
