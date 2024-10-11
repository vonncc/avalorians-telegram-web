
"use client"
import { useSearchParams } from 'next/navigation';
import React from 'react';


const SuccessPage = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('username'); // Extract the 'username' from the URL

    return (
        <div>
            <h1>Login Successful</h1>
            {username ? (
                <p>Welcome, {username}!</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SuccessPage;
