import React, { useState } from "react";

interface WalletItemProps {
    label: string;
    amount: number;
    imgBack1: string;
    imgBack2: string;
    imgBack3: string;
    imgIcon: string;
}


const WalletItem : React.FC<WalletItemProps> = (props) => {

    return (
        <div className="wallet-item">
            <div className="img-back-1" style={{ backgroundImage: `url(${props.imgBack1})` }} />
            <div className="img-back-2" style={{ backgroundImage: `url(${props.imgBack2})` }}>
                <span>{props.label + ":"}</span>
                <div className="content">
                    <span>{props.amount.toLocaleString()}</span>
                    <img src={props.imgIcon} alt="" style={{ paddingLeft: "0.4rem" }} />
                </div>
            </div>
            <div className="img-back-3" style={{ backgroundImage: `url(${props.imgBack3})` }} />
        </div>
    );
};

export default WalletItem;