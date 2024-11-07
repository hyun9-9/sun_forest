import React, { useState } from 'react';
import "../assets/css/rain.css";

function RainyDayWriter() {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <>
            <div className='writebanner'> 글 작성 </div>

            <div className="dropdownContainer">
                <select 
                    id="categoryDropdown" 
                    value={selectedOption} 
                    onChange={handleSelectChange} 
                    className="styledDropdown"
                >
                    <option value="">카테고리를 선택하세요</option>
                    <option value="햇살숲">햇살숲</option>
                    <option value="비오는날">비오는날</option>
                </select>

                <input type="text" placeholder="제목을 입력하세요" /> 

            </div>



        </>
    );
}

export default RainyDayWriter;
