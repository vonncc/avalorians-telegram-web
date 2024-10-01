import React from "react";
import "@/app/styles/pages/kingdom.css";
import Image from "next/image";

const Kingdom = () => {
    function handleBuildClick() {
        console.log("Build");
    }

    return (
        <div className="main-kingdom-container">
            <div className="flex pb-5">
                <div className="curved-box profit base-text"><span>Profit (1H)</span>
                    <div className="float-right pr-2">
                        <span className="pr-1">1,245</span>
                        <Image className="float-right" src="/assets/images/Coin.png" width={20} height={20} alt=""/>
                    </div>
                </div>
                <button className="curved-box build base-text" onClick={() => handleBuildClick()}>Build</button>
            </div>
            <Image src="/assets/images/kingdoms/kingdom.png" alt="kingdom" width={1000} height={1000}/>
        </div>
    );
};

export default Kingdom;
