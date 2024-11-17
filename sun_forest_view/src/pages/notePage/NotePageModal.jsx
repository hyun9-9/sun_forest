import React from 'react';
import "../../assets/css/notePage.css";

export default function Modal({ isOpen, children, closeModal, selectedSticky, deleteSticky }) {
    return (
      <div style={{ display: isOpen ? "block" : "none" }}>
        <div className="modal-overlay"></div>
        <div className="modal" style={{ backgroundColor: selectedSticky.color }}>
          <button className="close-button" onClick={closeModal}>
            X
          </button>
          <div>
            <h3>스티키 노트 내용</h3>

            <div className="sticky-note">
                <p>{selectedSticky.content}</p>
            </div>
            <button onClick={deleteSticky}>삭제</button>
            <button onClick={closeModal}>취소</button>

          </div>
        </div>
      </div>
    );
}
