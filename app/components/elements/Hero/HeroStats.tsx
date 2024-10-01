import React from "react";
import HeroSelect from "@/app/components/elements/Hero/HeroSelect";

interface HeroStatsProps {
    stats: HeroStats;
    heroSelect: number;
    currentHero: number;
    handleSelect: any;
}

interface HeroStats {
    hit_points: number;
    armor: number;
    attack_speed: number;
    splash_damage: number;
}

const HeroStats: React.FC<HeroStatsProps> = ({ stats, heroSelect, currentHero, handleSelect }) => {
    return (
        <div className="stats-container">
            <div className="stats-row">
                <div className="stats-item">
                    <div className="base-text">
                        <p className="stats-name">Hit Points</p>
                    </div>
                    <div className="base-text stats-up">
                        {stats.hit_points}
                    </div>
                </div>
                <div className="stats-item">
                    <div className="base-text">
                        <p className="stats-name">Armor</p>
                    </div>
                    <div className="base-text stats-up">
                        {stats.armor}
                    </div>
                </div>
            </div>
            <div className="stats-row">
                <div className="stats-item">
                    <div className="base-text">
                        <p className="stats-name">Splash Damage</p>
                    </div>
                    <div className="base-text stats-up">
                        {stats.splash_damage}
                    </div>
                </div>
                <div className="stats-item">
                    <div className="base-text">
                        <p className="stats-name">Attack Speed</p>
                    </div>
                    <div className="base-text stats-up">
                        {stats.attack_speed}
                    </div>
                </div>
            </div>
            <HeroSelect heroSelect={heroSelect} currentHero={currentHero} handleSelect={handleSelect}/>
        </div>
    );
};

export default HeroStats;
