"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { API_ENDPOINTS } from "@/app/_globals/constants/baseUrl";
import { useToken } from "@/app/context/token.context";

const SuccessPage = () => {
    const router = useRouter();
    const { token } = useToken();

    const handleAssign = async (twitterId: string, userId: string) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.POST_ASSIGN_TWITTER}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    progress: 1, // Your raw body as a JSON object
                    twitterId, // Include twitterId if needed
                    userId, // Include userId if needed
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update quest progress");
            }

            const data = await response.json();
            console.log("Success:", data);
        } catch (error) {
            console.error("Error in handleAssign:", error);
        }
    };

    useEffect(() => {
        const { twitterId, user } = router.query;

        // Extract first value if it's an array or use an empty string
        const twitterIdValue = Array.isArray(twitterId) ? twitterId[0] : twitterId || "";
        const userValue = Array.isArray(user) ? user[0] : user || "";

        if (twitterIdValue && userValue) {
            console.log("User linked successfully with ID:", userValue);
            handleAssign(twitterIdValue, userValue);
        }
    }, [router.query]);

    return <div>Twitter account linked successfully!</div>;
};

export default SuccessPage;
