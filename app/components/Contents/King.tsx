import React from "react";
import "@/app/styles/pages/king.css";
import Image from "next/image";
import {AvalorianDesignedSlider} from "@/app/components/elements/AvaloriansSlider";

const King = () => {
    return (
        <div>
            <div className="curved-box vault">
                <div className="top-side">
                    <span className="left-side text-[12px]">Vault: </span>
                    <span className="right-side text-[24px]">0 &nbsp;<Image src="/assets/images/icons/ava_coin.png"
                                                                            width={40} height={40}
                                                                            alt="ava_coin"/></span>
                </div>
                <div className="bottom-side text-[12px]">
                    <span className="left-side ">Kingdom Economy Hourly Income</span>
                    <span className="right-side">+ 0 &nbsp;<Image className="float-right"
                                                                  src="/assets/images/icons/ava_coin.png" width={30}
                                                                  height={30} alt="ava_coin"/></span>
                </div>
            </div>
            <div className="curved-box level">
                <div className="top-side">
                    <span className="left-side">Kingdom Lvl. 1</span>
                    <span className="right-side">{'0 >> 1M'}</span>
                </div>
                <div className="bottom-side">
                    <AvalorianDesignedSlider experience={0} level={1} nextLevelExp={[1000000000]} />
                </div>
            </div>
            <div className="inset-0 flex justify-center items-center mt-5">
                <img src="/assets/images/tempKing.png" className="max-w-full" alt=""/>
            </div>
        </div>
    );
};

export default King;
