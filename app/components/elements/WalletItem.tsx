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
        <div style={{
            display: "flex",
            width: "100%",
            height: "40px",
            margin: "0 0.2rem"
        }}>
            <div 
                style={{
                    backgroundImage: `url(${props.imgBack1})`,
                    backgroundPosition: "right center",
                    backgroundRepeat: "no-repeat",
                    height: "inherit",
                    width: "20px",
                }} 
            />
            <div
                style={{
                    backgroundImage: `url(${props.imgBack2})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat-x",
                    height: "inherit",
                    width: '100%',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                <span>{props.label + ":"}</span>
                <div 
                    style={{ 
                        display: "flex", 
                        alignItems: "center" 
                    }}>
                    <span>{props.amount.toLocaleString()}</span>
                    <img 
                        src={props.imgIcon} 
                        alt="" 
                        style={{ paddingLeft: "0.4rem" }} />
                </div>
            </div>
            <div 
                style={{
                    backgroundImage: `url(${props.imgBack3})`,
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                    height: "inherit",
                    width: "20px",
                }}
            />
        </div>
    );
};

export default WalletItem;