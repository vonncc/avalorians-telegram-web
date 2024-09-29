import React from "react";
import "@/app/styles/pages/kingdom.css";
import Image from "next/image";

const Kingdom = () => {
    return (
        <div className="main-kingdom-container">
            <div className="flex pb-5">
                <div className="curved-box profit base-text">Profit (1H)</div>
                <div className="curved-box build base-text">Build</div>
            </div>
            <Image src="/assets/images/kingdoms/kingdom.png" alt="kingdom" width={1000} height={1000}/>
        </div>
    );
};

export default Kingdom;
