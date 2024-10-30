import React from 'react';
import "../../assets/css/Main.css";

export default function Modal({ isOpen, children, closeModal }) {
    return (
        <div
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.35)",
          }}
        ></div>
          <div
            style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: 700,
            height: 1000,
            maxWidth: "100%",
            maxHeight: "90vh",  
            overflowY: "auto",
            backgroundColor: "white",
          }}
          >

        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "10px",          
            right: "10px",         
            backgroundColor: "white",
            border: "none",
            fontSize: "18px",       
            cursor: "pointer",     
          }}
        >
          X
        </button>

          <div>{children}</div>
          
        </div>
      </div>
    );
  }