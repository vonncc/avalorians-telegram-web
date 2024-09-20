import React from "react";

interface QuestsData {
    quests_id: string;
    quests_status: boolean;
}
// Define the type for the props
interface ButtonProps {
    text?: string;
    onClick?: () => void;
    data?: QuestsData;
}

// Apply the type to the component's props
const QuestsButton: React.FC<ButtonProps> = ({text, onClick, data}) => {
    return <button className="button button--full-large"  onClick={onClick}>{text}</button>;
};

export default QuestsButton;
