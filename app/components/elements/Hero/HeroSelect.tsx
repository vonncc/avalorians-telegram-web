import Image from "next/image";
import React from "react";

interface HeroSelectProps {
    heroSelect: number;
    currentHero: number;
    handleSelect: any;
}

export default function HeroSelect(props: HeroSelectProps) {

    const heroSelected = props.heroSelect === props.currentHero;

    return <div className="stats-row">
        <button className={`character-select justify-items-center grid ${heroSelected ? 'selected' : ''}` }
                value="Select" onClick={props.handleSelect}>
            <p className="character-select-text">{heroSelected ? 'SELECTED' : 'SELECT'} <Image className={heroSelected ? 'float-right' : 'hidden'} src="/assets/images/icons/check.png" width={15} height={15} alt="check" /></p>
        </button>
    </div>
}