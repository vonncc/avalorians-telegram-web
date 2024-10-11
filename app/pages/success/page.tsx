import { useRouter } from 'next/router';
import React from 'react'

const SuccessPage = () => {
    const router = useRouter();
    const { username } = router.query; // Extract the 'username' from the URL

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

export default SuccessPage