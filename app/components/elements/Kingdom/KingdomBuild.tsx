import Image from "next/image";
import React from "react";
import "@/app/styles/pages/kingdom.css";

const buildings = [
    {
        index: 0,
        type: "utility buildings",
        building: [
            {
                name: "tavern",
                price: 10000,
                isBuilt: false
            },
            {
                name: "hospital",
                price: 20000,
                isBuilt: false
            },
            {
                name: "chapel",
                price: 15000,
                isBuilt: false
            },
            {
                name: "blacksmith",
                price: 20000,
                isBuilt: false
            },
            {
                name: "portal",
                price: 40000,
                isBuilt: false
            }]
    },
    {
        index: 1,
        type: "economy buildings",
        building: [
            {
                name: "farmlands",
                price: 1000,
                isBuilt: false
            },
            {
                name: "pastures",
                price: 2000,
                isBuilt: false
            },
            {
                name: "marketplace",
                price: 3000,
                isBuilt: false
            }]
    },
    {
        index: 2,
        type: "decorations",
        building: [
            {
                name: "tree",
                price: 10,
                isBuilt: false
            },
            {
                name: "bush",
                price: 1,
                isBuilt: false
            }]
    }]

export default function KingdomBuild() {
    const [activeBuildings, setActiveBuildings] = React.useState(0);
    const [activeBuilding, setActiveBuilding] = React.useState("");

    function handleFilterClick(index: number) {
        setActiveBuildings(index);
    }

    function handleSelectClick(building: string) {
        setActiveBuilding(building)
    }

    return (
        <div className="w-full h-full text-center">
            <span className="text-2xl font-bold text-center">KINGDOM BUILDING</span>
            <div className="grid grid-cols-2 gap-1">
                {buildings.map((building) => {
                    return <span key={building.index} className={`curved-box filter text-sm px-4 ${activeBuildings === building.index ? '' : 'inactive'}`} onClick={() => {handleFilterClick(building.index)}}>{building.type}</span>
                })}
            </div>
            <div className="mt-5">
                <span>{buildings[activeBuildings].type} </span>
                <div className="grid grid-cols-3 gap-2 py-5">
                    {buildings[activeBuildings].building.map((building) => {
                        return <div key={building.name}
                                    className={`rounded-full border w-28 h-28 content-center items-center grid ${building.name === activeBuilding ? 'border-[#4FD464]' : 'border-[#FFA33E]'}`}
                                    onClick={() => handleSelectClick(building.name)}
                        >
                        <span className="align-middle"><Image className="float-left"
                                                              src="/assets/images/icons/money.png" height={20}
                                                              width={20} alt="Runes"/>{building.price}</span>
                            <div className={`curved-box building ${building.name === activeBuilding ? 'active' : ''}`}>{building.name}</div>
                        </div>
                    })}
                </div>
            </div>
            <span className="curved-box build-button w-full float-end h-11 text-center mt-5">Build</span>
        </div>
    )
}