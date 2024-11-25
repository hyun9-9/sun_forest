import React, { useState } from 'react';
import "../../assets/css/notePage.css";
import api from '../../lib/api';

function Modal({ isOpen, closeModal, selectedSticky }) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const deleteSticky = async (selectedSticky) => {
    console.log('deleteSticky', selectedSticky);
    const ref = await api.post('/api/posts/deletePost', selectedSticky);
    console.log('deleteref', ref);
  };

  const createSticky = async () => {
    // const newSticky = { content: newContent, color: 'defaultColor' }; // Set color or other default values if needed
    const newSticky = {title, memberId:1, content, gubun:'sundays'};
    const ref = await api.post('/api/posts/myNotes/save', newSticky);
    console.log('createSticky ref', ref);
    closeModal(); // Close modal after creation
  };

  const handleDeleteConfirm = () => {
    if (selectedSticky) {
      deleteSticky(selectedSticky);
      closeModal();
    }
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-overlay"></div>
      <div className="modal" style={{ backgroundColor: selectedSticky ? selectedSticky.color : '#fff' }}>
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        
        {selectedSticky ? (
          // Existing sticky note content and delete options
          <div>
            <h3>스티키 노트 내용</h3>
            <div className="sticky-note">
              <p>{selectedSticky.content}</p>
            </div>
            <button onClick={handleDeleteConfirm}>삭제</button>
            <button onClick={closeModal}>취소</button>
          </div>
        ) : (
          // Creation form for new sticky note
          <form className='mynoteForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="note_text">제목:</label>
            <input
              type="text"
              id="note_text"
              placeholder="Write your title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="note_text">내용:</label>
            <input
              type="text"
              id="note_text"
              placeholder="Write your note here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="button" onClick={createSticky}>스티키 노트 추가</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Modal;
