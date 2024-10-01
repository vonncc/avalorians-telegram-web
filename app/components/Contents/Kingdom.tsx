import React, { useEffect, useState } from "react";
import "@/app/styles/pages/kingdom.css";
import Image from "next/image";
import { API_ENDPOINTS } from "@/app/_globals/constants/baseUrl";
import { useToken } from "@/app/context/token.context";

interface KingdomProps {
    handleBuildClick: any;
}

const Kingdom = (props: KingdomProps) => {
    

    return (
        <div className="main-kingdom-container">
            <div className="flex pb-5">
                <div className="curved-box profit base-text"><span>Profit (1H)</span>
                    <div className="float-right pr-2">
                        <span className="pr-1">1,245</span>
                        <Image className="float-right" src="/assets/images/Coin.png" width={20} height={20} alt=""/>
                    </div>
                </div>
                <button className="curved-box build base-text" onClick={() => props.handleBuildClick(8)}>Build</button>
            </div>
            <Image src="/assets/images/kingdoms/kingdom.png" alt="kingdom" width={1000} height={1000}/>
        </div>
    );
};

export default Kingdom;
