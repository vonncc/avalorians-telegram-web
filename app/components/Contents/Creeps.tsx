import React from "react";
import "@/app/styles/pages/creeps.css";
const Creeps = () => {
    return (
        <div>
            
            <div className="inset-0 flex justify-center items-center" style={{ opacity: 0.5 }}>
                <img src="/assets/images/FrameCreeps.png" className="max-w-full" />
            </div>
            <div className="inset-0 flex justify-center items-center">
                <div className="max-w-full h-auto base-text justify-center items-center" style={{ position: "fixed", transform: "translateY(-50%)", top: "50%" }}>
                    CREEPS COMING SOON
                </div>
            </div>
            
        </div>
    );
};

export default Creeps;
