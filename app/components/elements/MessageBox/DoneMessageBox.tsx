import React from "react";
import "@/app/styles/elements/messagebox.css";

const DoneMessageBox = ({ title, info, buttonText, onClickPass, reward, onClose }) => {
    function onClickHandle() {}

    return (
        <div className="overlay">
            <div className="messageBox">
                <button
                    className="closeButton"
                    onClick={() => {
                        /* Your close handler here */
                        onClose();
                    }}
                >
                    &times; {/* This is the HTML entity for the multiplication sign (X) */}
                </button>
                <h1 className="title">{title}</h1>
                <p className="info">{info}</p>
                <p className="info">+{reward}</p>
                <button
                    className="button"
                    onClick={() => {
                        onClickPass();
                    }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default DoneMessageBox;
