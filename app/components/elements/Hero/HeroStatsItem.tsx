import React from "react";

const HeroStatsItem = () => {
    return (
        <div className="stats-item">
            <div className="base-text">hit points:</div>
            <div className="base-text">
                {0}
                <button>
                    <img src="/assets/images/hero/Plus.png" />
                </button>
            </div>
        </div>
    );
};

export default HeroStatsItem;
