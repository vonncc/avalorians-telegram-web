import React from "react";
import "@/app/styles/pages/airdrop.css";
import Image from "next/image";
const Airdrop = () => {
    return (
        <div>
            <div className="inset-0 flex justify-center items-center" style={{ opacity: 0.5 }}>
                <img src="/assets/images/FrameAirdrop.png" className="max-w-full" />
            </div>
            <div className="inset-0 flex justify-center items-center">
                <div
                    className="max-w-full h-auto base-text justify-center items-center"
                    style={{ position: "fixed", transform: "translateY(-50%)", top: "50%" }}
                >
                    AIRDROP COMING SOON
                </div>
            </div>
        </div>
    );
};

export default Airdrop;
//
