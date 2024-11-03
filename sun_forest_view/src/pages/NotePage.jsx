import React, { useEffect, useState } from 'react';
import "../assets/css/notePage.css";
import Modal from './component/NotePageModal'; // 모달 컴포넌트 추가

function NotePage() {
  const [stickiesArray, setStickiesArray] = useState([]);
  const [selectedSticky, setSelectedSticky] = useState(null); // 선택된 스티키 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태

  useEffect(() => {
    const storedStickies = JSON.parse(localStorage.getItem('stickiesArray')) || [];
    const loadedStickies = storedStickies.map(key => {
      const item = JSON.parse(localStorage.getItem(key));
      return { key, ...item };
    });
    setStickiesArray(loadedStickies);
  }, [selectedSticky]);

  const saveStickiesArray = (updatedArray) => {
    localStorage.setItem('stickiesArray', JSON.stringify(updatedArray.map(sticky => sticky.key)));
    setStickiesArray(updatedArray);
  };

  const createSticky = () => {
    const value = document.getElementById("note_text").value;
    const color = document.getElementById("note_color").value;
    const key = `sticky_${Date.now()}`;
    const newSticky = { key, value, color };

    localStorage.setItem(key, JSON.stringify(newSticky));
    const updatedArray = [...stickiesArray, newSticky];
    saveStickiesArray(updatedArray);
    document.getElementById("note_text").value = '';
  };

  const deleteSticky = (key) => {
    localStorage.removeItem(key);
    const updatedArray = stickiesArray.filter(sticky => sticky.key !== key);
    saveStickiesArray(updatedArray);
  };

  const clearStickyNotes = () => {
    localStorage.clear();
    setStickiesArray([]);
  };

  const openModal = (sticky) => {
    console.log('sticky',sticky);
    setSelectedSticky(sticky); // 선택된 스티키 설정
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSticky(null); // 선택된 스티키 초기화
  };

  const handleDeleteConfirm = () => {
    if (selectedSticky) {
      deleteSticky(selectedSticky.key); // 스티키 삭제
      closeModal(); // 모달 닫기
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="note_color">색상:</label>
        <select id="note_color">
          <option value="LightGoldenRodYellow">노란색</option>
          <option value="PaleGreen">녹색</option>
          <option value="LightPink">분홍</option>
          <option value="LightBlue">파란색</option>
        </select>
        <label htmlFor="note_text">내용:</label>
        <input type="text" id="note_text" placeholder="Write your note here" />
        <button type="button" onClick={createSticky}>스티키 노트 추가</button>
        <button type="button" onClick={clearStickyNotes}>스티키 노트 전부 삭제</button>
      </form>

      <ul id="stickies">
        {stickiesArray.map(sticky => (
          <li 
            key={sticky.key} 
            style={{ backgroundColor: sticky.color }}
            onClick={() => openModal(sticky)} // 클릭 시 모달 열기
          >
            <span>{sticky.value}</span>
          </li>
        ))}
      </ul>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <h3>스티키 노트 내용</h3>
            {selectedSticky && (
                <>
                    <div className="sticky-note">
                        <p>{selectedSticky.value}</p>
                    </div>
                    <button onClick={handleDeleteConfirm}>삭제</button>
                    <button onClick={closeModal}>취소</button>
                </>
            )}
        </Modal>
      )}
    </div>
  );
}

export default NotePage;
