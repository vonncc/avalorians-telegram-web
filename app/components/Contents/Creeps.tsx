import React from "react";
import "@/app/styles/pages/creeps.css";
import Image from "next/image";

const chests = [
    {
        type: "wooden",
    },
    {
        type: "steel",
    },
    {
        type: "gold",
    },
    {
        type: "diamond",
    }
]

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
        <div>
            <div className="">
                <div>
                    <span>My Chests</span>
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
                    <div className="inset-0 flex justify-center items-center">
                        <img src="/assets/images/creeps/tempChests.png" className="max-w-full" alt=""/>
                    </div>
                </div>
                <div className="mt-5">
                    <span>My Spawning Gallery</span>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="rounded-full w-16 h-16 border border-[#CC8E44]"
                             onClick={handleCreepDeselect}
                        >
                            <Image className={selected ? '' : 'hidden'} src="/assets/images/creeps/swamp-crawler.png" width={60} height={60} alt="swamp-crawler" />
                        </div>
                        <div className="rounded-full w-16 h-16 border border-[#CC8E44]" />
                        <div className="rounded-full w-16 h-16 border border-[#CC8E44]" />
                        <div className="rounded-full w-16 h-16 border border-[#CC8E44]" />
                        <div className="rounded-full w-16 h-16 border border-[#CC8E44]" />
                    </div>
                </div>
                <div className="mt-5">
                    <span>Captured Creeps</span>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="captured-creeps common" onClick={handleCreepSelect}>
                            <Image src="/assets/images/creeps/swamp-crawler.png" width={109} height={109} alt="swamp-crawler" />
                        </div>
                        <div className="captured-creeps rare"/>
                        <div className="captured-creeps epic"/>
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
