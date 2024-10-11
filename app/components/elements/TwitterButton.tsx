import React from 'react'

const TwitterButton = () => {
    const handleTwitterLogin = () => {
        // window.location.href = 'https://7882-120-28-179-30.ngrok-free.app/auth/twitter'; // Adjust to your backend URL
        window.open('https://aff1-120-28-179-30.ngrok-free.app/api/v1/auth/twitter', "_blank");
    };

    return (
        <button onClick={handleTwitterLogin}>Login with Twitter</button>
    );
}

export default TwitterButton
