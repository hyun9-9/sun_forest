import React, { useState } from 'react';
import "../../assets/css/notePage.css";
import api from '../../lib/api';

function Modal({ isOpen, closeModal, selectedSticky }) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const deleteSticky = async () => {
    await api.post('/api/posts/deletePost', selectedSticky);
    closeModal();
  };

  const createSticky = async () => {
    const newSticky = { title, memberId: 1, content, gubun: 'mynote' };
    await api.post('/api/posts/myNotes/save', newSticky);
    closeModal();
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }} className="modal-wrapper">
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content modal" style={{ backgroundColor: selectedSticky ? selectedSticky.color : '#fff' }}>
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>

        {selectedSticky ? (
          <div className="sticky-display">
            <h3 className="sticky-title">{selectedSticky.title}</h3>
            <div className="sticky-note">
              <p>{selectedSticky.content}</p>
            </div>
            <div className="button-group">
              <button className="delete-button" onClick={deleteSticky}>삭제</button>
              <button className="cancel-button" onClick={closeModal}>취소</button>
            </div>
          </div>
        ) : (
          <form className="mynote-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="note_title">제목:</label>
            <input
              type="text"
              id="note_title"
              placeholder="Write your title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
            <label htmlFor="note_content">내용:</label>
            <textarea
              id="note_content"
              placeholder="Write your note here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea-field"
            ></textarea>
            <div className="button-group">
              <button type="button" className="add-button" onClick={createSticky}>스티키 노트 추가</button>
              <button type="button" className="cancel-button" onClick={closeModal}>취소</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Modal;
