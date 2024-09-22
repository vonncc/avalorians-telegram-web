import React from "react";
import "@/app/styles/pages/kingdom.css";
import KingdomProfile from "../elements/Kingdom/KingdomProfile";
import KingdomExperience from "../elements/Kingdom/KingdomExperience";
import KingdomItems from "../elements/Kingdom/KingdomItems";
import { Button } from "@nextui-org/button";

const Kingdom = () => {
    return (
        <div className="main-kingdom-container">
            <KingdomProfile></KingdomProfile>
            <div style={{ marginBottom: "10px" }}></div>
            <KingdomExperience></KingdomExperience>
            <div style={{ marginBottom: "20px" }}></div>
            <Button className="upgrade-button box-button base-text">Upgrade</Button>
            <div style={{ marginBottom: "40px" }}></div>
            Kingdom Buildings
            <div style={{ marginBottom: "10px" }}></div>
            <div className="kingdoms-container">
                <KingdomItems level={1} name="Main Castle" />
                <KingdomItems level={1} name="Main Castle" /> 
                <KingdomItems level={1} name="Main Castle" /> 
                <KingdomItems level={1} name="Main Castle" /> 
                <KingdomItems level={1} name="Main Castle" /> 
                <KingdomItems level={1} name="Main Castle" /> 
                <KingdomItems level={1} name="Main Castle" /> 
                <KingdomItems level={1} name="Main Castle" /> 
            </div>
        </div>
    );
};

export default Kingdom;
