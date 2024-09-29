import React from "react";

interface HeroStatsProps {
    hit_points?: number;
    armor?: number;
    attack_speed?: number;
    splash_damage?: number;
}

const HeroStats: React.FC<HeroStatsProps> = ({ hit_points = 10, armor = 12, attack_speed = 8, splash_damage = 3 }) => {
    return (
        <div className="stats-container">
            <div className="stats-row">
                <div className="stats-item">
                    <div className="base-text">
                        <p className="stats-name">Hit Points</p>
                    </div>
                    <div className="base-text stats-up">
                        {hit_points}
                    </div>
                </div>
                <div className="stats-item">
                    <div className="base-text">
                        <p className="stats-name">Armor</p>
                    </div>
                    <div className="base-text stats-up">
                        {armor}
                    </div>
                </div>
            </div>
            <div className="stats-row">
                <div className="stats-item">
                    <div className="base-text">
                        <p className="stats-name">Splash Damage</p>
                    </div>
                    <div className="base-text stats-up">
                        {splash_damage}
                    </div>
                </div>
                <div className="stats-item">
                    <div className="base-text">
                        <p className="stats-name">Attack Speed</p>
                    </div>
                    <div className="base-text stats-up">
                        {attack_speed}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroStats;
