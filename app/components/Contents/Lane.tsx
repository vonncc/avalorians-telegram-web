import React from "react";
import "@/app/styles/pages/lane.css";
const Lane = () => {
    return (
        <div>
            <div className="inset-0 flex justify-center items-center size-full" style={{ opacity: 0.5 }}>
                <img src="/assets/images/Lane/tempLaneBG.png" className="max-w-full"  alt=""/>
            </div>
            <div className="inset-0 flex justify-center items-center">
                <div
                    className="max-w-full h-auto base-text justify-center items-center"
                    style={{ position: "fixed", transform: "translateY(-50%)", top: "50%" }}
                >
                    LANE GAME COMING SOON
                </div>
            </div>
        </div>
    );
};

export default Lane;
