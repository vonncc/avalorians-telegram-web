import { Button } from "@nextui-org/button";
import React from "react";

interface HeroStatsProps {
    hit_points?: number;
    armor?: number;
    attack_speed?: number;
    mana?: number;
}

const HeroStats: React.FC<HeroStatsProps> = ({ hit_points = 10, armor = 1, attack_speed = 1, mana = 10 }) => {
    return (
        <div className="stats-container">
            <div className="stats-row">
                <div className="stats-item">
                    <div className="base-text">
                        <img src="/assets/images/hero/HIT_POINTS.png" />
                    </div>
                    <div className="base-text stats-up">
                        {hit_points}
                        <button>
                            <img src="/assets/images/hero/Plus.png" />
                        </button>
                    </div>
                </div>
                <div className="stats-item">
                    <div className="base-text">
                        <img src="/assets/images/hero/ARMOR.png" />
                    </div>
                    <div className="base-text stats-up">
                        {armor}
                        <button>
                            <img src="/assets/images/hero/Plus.png" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="stats-row">
                <div className="stats-item">
                    <div className="base-text">
                        <img src="/assets/images/hero/ATTACK_SPEED.png" />
                    </div>
                    <div className="base-text stats-up">
                        {attack_speed}
                        <button>
                            <img src="/assets/images/hero/Plus.png" />
                        </button>
                    </div>
                </div>
                <div className="stats-item">
                    <div className="base-text">
                        <img src="/assets/images/hero/MANA.png" />
                    </div>
                    <div className="base-text stats-up">
                        {mana}
                        <button>
                            <img src="/assets/images/hero/Plus.png" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroStats;
