import React from "react";

interface SkillProps {
    skill_id?: string;
    skill_image?: string;
    slot_number?: number;
    skill_level?: number;
}

const HeroSkill: React.FC<SkillProps> = ({ skill_id = "1", skill_image = "/assets/images/lock.png", slot_number, skill_level = 1 }) => {
    return (
        <div className="hero-skills-object">
            <div className="hero-skills-items">
                <div className="base-text label-with-background">{slot_number}</div>
                <div className="frame">
                    <img src="/assets/images/CircleFrame.png" />
                </div>
                <div className="icon">
                    <img src={`${skill_image}`} />
                </div>
                <div className="details">
                    <div className="base-text top-part">LVL. {skill_level}</div>
                </div>
            </div>
        </div>
    );
};

export default HeroSkill;
