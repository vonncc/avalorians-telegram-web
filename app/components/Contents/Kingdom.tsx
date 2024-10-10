import React, { useEffect, useRef, useState } from "react";
import "@/app/styles/pages/kingdom.css";
import Image from "next/image";
import { API_ENDPOINTS } from "@/app/_globals/constants/baseUrl";
import { useToken } from "@/app/context/token.context";

interface KingdomProps {
    handleBuildClick: any;
    token: string;
}

const Kingdom = (props: KingdomProps) => {
    
    // TODO: just test if working, if yes, then reuse what's on the lane
    const iframeRef = useRef(null);

    useEffect(() => {
        
        // Function to handle incoming postMessage events
        const handleMessage = (event) => {

            if (event.origin !== window.location.origin) {
                console.log("Message from unauthorized origin:", event.origin);
                return;
            }

            const data = typeof event.data === "object" ? event.data : JSON.parse(event.data);
            console.log("Received message from Unity WebGL:", data);

            if (data.action === "initialization") {
                sendMessageToUnity("access_token", props.token);
                sendMessageToUnity("scene_change", "kingdom");
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
    const sendMessageToUnity = (action, content) => {
        const iframe = iframeRef.current;

        if (iframe && iframe.contentWindow) {
            const data = {
                action: action,
                content: content
            };
            iframe.contentWindow.postMessage(JSON.stringify(data), window.location.origin);
        } else {
            console.error("Iframe not found or not loaded yet.");
        }
    };

    return (
        <div className="main-kingdom-container size-full">
            <div className="flex pb-5">
                <div className="curved-box profit base-text"><span>Profit (1H)</span>
                    <div className="float-right pr-2 text-center">
                        <span className="pr-1">0</span>
                        <Image className="float-right" src="/assets/images/Coin.png" width={20} height={20} alt=""/>
                    </div>
                </div>
                <button className="curved-box build base-text" onClick={() => props.handleBuildClick(9)}>BUILD</button>
            </div>
            {/* <Image src="/assets/images/kingdoms/kingdom.png" alt="kingdom" width={1000} height={1000}/> */}
            <iframe
                    ref={iframeRef}
                    title="Unity WebGL Game"
                    className="gameIframe" 
                    id="gameIframe"
                    src="/WebGLBuild/index.html"
                />
        </div>
    );
};

export default Kingdom;
