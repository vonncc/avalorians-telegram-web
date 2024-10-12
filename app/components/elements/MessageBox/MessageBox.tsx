"use client";
import React, { useState } from "react";
import "@/app/styles/elements/messagebox.css";

const MessageBox = ({ title, info, buttonText, onClickPass, quest_id, onClose }) => {
    const [qId, setQid] = useState(quest_id);
    const [buttonTxt, setButtonTxt] = useState(buttonText);
    function onClickHandle() {
        setButtonTxt("CHECKING");
        if (onClickPass) onClickPass();
    }
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
                <button
                    className="button"
                    onClick={() => {
                        setButtonTxt("CHECKING");
                        onClickPass(qId);
                    }}
                >
                    {buttonTxt}
                </button>
            </div>
        </div>
    );
};

export default MessageBox;
