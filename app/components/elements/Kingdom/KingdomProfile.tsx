import React from "react";

const KingdomProfile = () => {
    return (
        <div className="profile-container">
            <div className="vault-section">
                <div className="left-side">
                    <div className="base-text">VAULT</div>
                </div>
                <div className="right-side">
                    <div className="vault-text base-text">192,786,825</div>
                    <img src="/assets/images/Coin.png" alt="Badge Icon" className="icon" />
                </div>
            </div>
            <div className="economy-section">
                <div className="left-side">
                    <div className="base-text">HOUR FROM KINGDOM ECONOMY:</div>
                </div>
                <div className="right-side">
                    <div className="base-text">+339,081</div>
                    <img src="/assets/images/Coin.png" alt="Badge Icon" className="icon" />
                </div>
                
            </div>
        </div>
    );
};

export default KingdomProfile;
