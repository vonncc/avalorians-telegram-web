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
    return (
        <div>
            {/*<div className="">*/}
            {/*    <div>*/}
            {/*        <span>My Chests</span>*/}
            {/*        <div className="grid grid-cols-4 gap-4">*/}
            {/*            {chests.map((chest) => {*/}
            {/*                return <div key={chest.type}*/}
            {/*                            className="rounded-full w-16 h-16 border border-[#CC8E44]">*/}
            {/*                    <Image className="absolute top-12 ml-4" src="/assets/images/tabs/store.png" width={30} height={30} alt="Chests" />*/}
            {/*                    <span className="absolute top-6">{chest.type}</span>*/}
            {/*                    <span className="curved-box">Open</span>*/}
            {/*                </div>*/}
            {/*            })}*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <span>My Spawning Gallery</span>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <span>My Collection</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="inset-0 flex justify-center items-center">
                <img src="/assets/images/FrameCreeps.png" className="max-w-full" alt=""/>
            </div>
        </div>
    );
};

export default Creeps;
