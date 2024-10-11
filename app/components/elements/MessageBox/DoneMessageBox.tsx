import React from 'react';
import "@/app/styles/elements/messagebox.css";

const MessageBox = ({ title, info, buttonText }) => {
  return (
    <div className="messageBox">
      <h1 className="title">{title}</h1>
      <p className="info">{info}</p>
      <button className="button">{buttonText}</button>
    </div>
  );
};

export default MessageBox;
