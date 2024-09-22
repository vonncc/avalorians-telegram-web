import { Button } from "@nextui-org/button";
import React from "react";

class KingdomProps {
    level: number = 1
    name: string = ""
    image?: string = "/assets/images/kingdoms/testKingdom.png" 
    cost?: number = 99999
    rate?: number = 0;
}

const KingdomItems: React.FC<KingdomProps> = ({level, name, image = "/assets/images/kingdoms/testKingdom.png" , cost = 99999, rate = 0}) => {
    return (
        <div className="kingdom-object">
            <div className="kingdom-items">
                <div className="base-text label-with-background">LVL. {level}</div>
                <div className="frame">
                    <img src="/assets/images/CircleFrame.png" />
                </div>
                <div className="icon">
                    <img src={`${image}`} />
                </div>
                <div className="details">
                    <div className="base-text top-part">{name}</div>
                    <div className="base-text bottom-part">
                        + {rate} / 1H <img src="/assets/images/Coin.png" />
                    </div>
                </div>
                <Button className="box-button base-text kingdom-items-button">Upgrade</Button>
            </div>
        </div>
    );
};  

export default KingdomItems;
