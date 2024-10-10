import React, { useEffect, useRef } from "react";
import "@/app/styles/pages/lane.css";

const Lane = () => {
    const iframeRef = useRef(null);

    useEffect(() => {
        
        // Function to handle incoming postMessage events
        const handleMessage = (event) => {

            if (event.origin !== window.location.origin) {
                console.log("Message from unauthorized origin:", event.origin);
                return;
            }

            const data = JSON.parse(event.data);
            console.log("Received message from Unity WebGL:", data);

            if (data.action === "initialization") {
                
            }
        };

        // Add event listener for message events
        window.addEventListener("message", handleMessage);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    // Function to send a message to the Unity WebGL iframe
    const sendMessageToUnity = (message) => {
        const iframe = iframeRef.current;

        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(message, window.location.origin);
            console.log("Sent message to Unity WebGL:", message);
        } else {
            console.error("Iframe not found or not loaded yet.");
        }
    };

    return (
        <div>
            <div className="inset-0 flex justify-center items-center size-full">
                <iframe
                    ref={iframeRef}
                    title="Unity WebGL Game"
                    className="gameIframe" 
                    id="gameIframe"
                    src="/WebGLBuild/index.html"
                />
            </div>
        </div>
    );
};

export default Lane;
