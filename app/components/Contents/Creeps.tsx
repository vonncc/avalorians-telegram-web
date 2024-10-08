import React from "react";
import "@/app/styles/pages/creeps.css";
import Image from "next/image";

const chests = [
    {
        type: "wooden",
        src: "/assets/images/chests/chest-anim-wood-png.png"
    },
    {
        type: "steel",
        src: "/assets/images/chests/chest-anim-steel-png.png"
    },
    {
        type: "gold",
        src: "/assets/images/chests/chest-anim-gold-png.png"
    },
    {
        type: "diamond",
        src: "/assets/images/chests/chest-anim-diamond-png.png"
    }
];

const temporaryCreeps = [
    {
        level: 1,
        count: 1,
        maxCount: 3,
        label: "Swamp Crawler",
        src: "/assets/images/creeps/swamp-crawler.png",
        rarity: "common"
    },
    // {
    //     level: 1,
    //     count: 1,
    //     maxCount: 3,
    //     label: "",
    //     src: null,
    //     rarity: "rare"
    // },
    // {
    //     level: 1,
    //     count: 1,
    //     maxCount: 3,
    //     label: "",
    //     src: null,
    //     rarity: "epic"
    // }
];

const Creeps = () => {
    const [selected, setSelected] = React.useState<boolean>(false);

    function handleCreepSelect() {
        setTimeout(() => {
            setSelected(true);
        }, 1000)
    }

    function handleCreepDeselect() {
        setTimeout(() => {
            setSelected(false);
        }, 1000)
    }

    return (
        <div className="creeps">
            <div className="">
                <div className="section">
                    <span className="label">My Chests</span>
                    <div className="content grid grid-cols-4 mt-2">
                        {chests.map((chest) => {
                            return (
                                <div key={chest.type} className="my-chest">
                                    <div className="type-label">{chest.type}</div>
                                    <Image className="icon" src={chest.src} width={30} height={30} alt="Chests" />
                                    <div className="open-button absolute bottom-20">Open</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <div>
                    <span>My Chests</span> */}
                    {/*<div className="grid grid-cols-4 gap-4 mt-2">*/}
                    {/*    {chests.map((chest) => {*/}
                    {/*        return <div key={chest.type}*/}
                    {/*                    className="rounded-full w-16 h-16 border border-[#CC8E44]">*/}
                    {/*            <Image className="absolute top-12 ml-4" src="/assets/images/tabs/store.png" width={30} height={30} alt="Chests" />*/}
                    {/*            <span className="absolute top-8">{chest.type}</span>*/}
                    {/*            <span className="absolute top-20 py-1 px-3 curved-box">Open</span>*/}
                    {/*        </div>*/}
                    {/*    })}*/}
                    {/*</div>*/}
                    {/* <div className="inset-0 flex justify-center items-center">
                        <img src="/assets/images/creeps/tempChests.png" className="max-w-full" alt=""/>
                    </div>
                </div> */}

                <div className="section">
                    <span className="label">My Spawning Gallery</span>
                    <div className="content grid grid-cols-5">
                        <div className="spawning-gallery"
                             onClick={handleCreepDeselect}
                        >
                            <Image className={selected ? '' : 'hidden'} src="/assets/images/creeps/swamp-crawler.png" width={60} height={60} alt="swamp-crawler" />
                        </div>
                        <div className="spawning-gallery" />
                        <div className="spawning-gallery" />
                        <div className="spawning-gallery" />
                        <div className="spawning-gallery" />
                    </div>
                </div>

                <div className="section">
                    <span className="label">Captured Creeps</span>
                    <div className="content grid grid-cols-3">
                        {temporaryCreeps.map((creep) => {
                            return (
                                <div key={creep.label} className={"captured-creep " + creep.rarity} onClick={handleCreepSelect}>
                                    <div className="level-label">{"LVL. " + creep.level}</div>
                                    {creep.src
                                        ? <Image src={creep.src} width={109} height={109} alt="swamp-crawler" /> 
                                        : null}
                                    <div className="name-label">{creep.label}</div>
                                    <div className="merge-button absolute bottom-20">
                                        <div>Merge</div>
                                        <div className="count-label">{creep.count + " / " + creep.maxCount}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/*<div className="inset-0 flex justify-center items-center">*/}
            {/*    <img src="/assets/images/FrameCreeps.png" className="max-w-full" alt=""/>*/}
            {/*</div>*/}
        </div>
    );
};

export default Creeps;
