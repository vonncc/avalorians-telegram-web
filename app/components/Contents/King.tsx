import React, {useEffect} from "react";
import "@/app/styles/pages/king.css";
import Image from "next/image";
import {AvalorianDesignedSlider} from "@/app/components/elements/AvaloriansSlider";
import {useUserState} from "@/app/context/data.context";
import styles from "@/app/styles/cc.module.css";

const King = () => {

    const { userStateData } = useUserState();

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
            <div className="w-full justify-center items-center mt-5">
                <span className="flex justify-center font-bold">{userStateData ? userStateData.character_name : "Avalorians User"}</span>
                <div className="grid grid-cols-2">
                    <div className="grid">
                        <div className="" style={{height: "22vh"}}>
                            <div>
                                <div className={styles.heroViewer}>
                                    {" "}
                                        <div className={styles.heroFrame}/>
                                        <div className={styles.skin} style={{backgroundImage: 'url("/assets/images/character/skin/male/201.png")'}} />
                                        <div className={styles.hair} style={{backgroundImage: 'url("/assets/images/character/hair/male/207.png")'}} />
                                        <div className={styles.cloth} style={{backgroundImage: 'url("/assets/images/character/cloth/male/222.png")'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stats-container king">
                        <div className="stats-row">
                            <div className="stats-item">
                                <div className="base-text">
                                    <p className="stats-name">Hit Points</p>
                                </div>
                                <div className="base-text stats-up">
                                    {userStateData ? userStateData.hit_points : 0}
                                </div>
                            </div>
                        </div>
                        <div className="stats-row">
                            <div className="stats-item">
                                <div className="base-text">
                                    <p className="stats-name">Armor</p>
                                </div>
                                <div className="base-text stats-up">
                                    {userStateData ? userStateData.armor : 0}
                                </div>
                            </div>
                        </div>
                        <div className="stats-row">
                            <div className="stats-item">
                                <div className="base-text">
                                    <p className="stats-name">Splash Damage</p>
                                </div>
                                <div className="base-text stats-up">
                                    0
                                </div>
                            </div>
                        </div>
                        <div className="stats-row">
                            <div className="stats-item">
                                <div className="base-text">
                                    <p className="stats-name">Attack Speed</p>
                                </div>
                                <div className="base-text stats-up">
                                    {userStateData ? userStateData.attack_speed : 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default King;
