import React, { useState } from 'react';
import "../../assets/css/notePage.css";
import api from '../../lib/api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Modal({ isOpen, closeModal, selectedSticky }) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const deleteSticky = async () => {
    await api.post('/api/posts/deletePost', selectedSticky);
    closeModal();
  };

  const createSticky = async () => {
    const newSticky = { title, memberId: 1, content, gubun: 'mynote', view :false };
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
            <p>
            {selectedSticky.content
                    .replace(/<p>/g, '\n')
                    .replace(/<\/p>/g, '')
                    .replace(/&nbsp;/g, ' ')
                    .split("\n")
                    .map((line, index) => (
            <React.Fragment key={index}>{line}<br /></React.Fragment>
            ))}
            </p>
            </div>
            <div className="button-group">
              <button className="delete-button" onClick={deleteSticky}>삭제</button>
              <button className="cancel-button" onClick={closeModal}>취소</button>
            </div>
          </div>
        ) : (
            <form className='writeForm' onSubmit={(e) => e.preventDefault()}>
                <div className='dropdownContainer'>
                    <select id="categoryDropdown" className='styledDropdown'>
                        <option value="">카테고리를 선택하세요</option>
                        <option value="sundays">햇살숲</option>
                        <option value="rainydays">비오는날</option>
                    </select>

                    <input  type="text"  placeholder="제목을 입력하세요"  value={title} onChange={(e) => setTitle(e.target.value)}  />
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
