import React from "react";
import "@/app/styles/pages/store.css";
const Store = () => {
    return (
        <div>
            <div className="inset-0 flex justify-center items-center" style={{ opacity: 0.5 }}>
                <img src="/assets/images/Store/store.png" className="max-w-full"/>
            </div>
            <div className="inset-0 flex justify-center items-center">
                <div
                    className="max-w-full h-auto base-text justify-center items-center"
                    style={{position: "fixed", transform: "translateY(-50%)", top: "50%"}}
                >
                    STORE COMING SOON
                </div>
            </div>
        </div>
    );
};

export default Store;
