import React from 'react';
import "../../assets/css/notePage.css";

export default function Modal({ isOpen, children, closeModal }) {
    return (
      <div style={{ display: isOpen ? "block" : "none" }}>
        <div className="modal-overlay"></div>
        <div className="modal">
          <button className="close-button" onClick={closeModal}>
            X
          </button>
          <div>{children}</div>
        </div>
      </div>
    );
}
