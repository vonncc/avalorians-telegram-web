// components/MessageBox.js
import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      margin: '0 0 10px',
    },
    body: {
      margin: '0 0 20px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#0070f3',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

const MessageBox = ({ title, body, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.body}>{body}</p>
        <button style={styles.button} onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default MessageBox;