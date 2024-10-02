import React from "react";
import "@/app/styles/pages/lane.css";
const Lane = () => {
    return (
        <div>
            <div className="inset-0 flex justify-center items-center size-full">
                <iframe className="gameIframe" id="gameIframe" src="https://tubular-arithmetic-ed9cbe.netlify.app" />
            </div>
        </div>
    );
};

export default Lane;
