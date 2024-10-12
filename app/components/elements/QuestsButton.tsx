import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import Image from "next/image";
// import '@/app/styles/pages/quests.css';

interface QuestsData {
    quests_id: string;
    quests_status: boolean;
    quests_reward: number;
    quests_url: string;
    is_done: boolean;
    reward_claimed?: boolean;
}
// Define the type for the props
interface ButtonProps {
    text: string;
    image: string;
    onClick?: (data: QuestsData, index: number, category: string, isDone: boolean) => void;
    data: QuestsData;
    messageStatus?: MessageStatus;
    setMessageStatus?: React.Dispatch<React.SetStateAction<MessageStatus>>; // Add this
    index?: number;
    category: string;
}

enum MessageStatus {
    NORMAL,
    REWARDED,
    CLAIMED,
}

// Apply the type to the component's props
const QuestsButton: React.FC<ButtonProps> = ({ text, onClick, image, data, messageStatus, setMessageStatus, index, category }) => {
    const [buttonDisabled, setIsDisabled] = useState(data.reward_claimed);
    const [indexInArray, setIndexInArray] = useState(index  || -1);
    const [categoryToUse, setGategory] = useState(category);

    const [myData, setMydata] = useState(data);

    const [isDone, setIsDone] = useState(data.is_done);
    // const [messageStatusRef, setMessageStatus] = useState<MessageStatus>(MessageStatus.NORMAL);
    
    function Enable() {
        setIsDisabled(false);
    }

    function Disable() {
        setIsDisabled(true);
    }

    function ButtonClicked() {

        console.log('opo');
        console.log(myData.quests_id);
        if (onClick && data) {
            setIsDone(true);
            onClick(myData, indexInArray, category, isDone);
            
            // Disable();
        }
    }
    // const buttonState
    // "/assets/images/icons/youtubeIcon.png"
    return !buttonDisabled ?  (
        <Button className="box button" onClick={ButtonClicked} color="primary">
            {/* <Image src={`${image}`} alt="icon for image" /> */}
            <div className="border">
                <img src={`${image}`} alt="icon for image" />
            </div>
            <div className="description">
                <div className="text">{text}{buttonDisabled}</div>

                {/* Anything Below here is next line */}
                <div className="reward-box-button">
                    <img src="/assets/images/icons/money.png" alt="Money Icon" />
                    <div className="reward-text">+{data.quests_reward}</div>
                </div>
            </div>

            <img className="arrow-right" src="/assets/images/ArrowRight.png"></img>
        </Button>
    ) : (
        <Button isDisabled className="box button" color="primary">
            {/* <Image src={`${image}`} alt="icon for image" /> */}
            <div className="border">
                <img src="/assets/images/done.png" alt="icon for image" />
            </div>
            <div className="description">
                <div className="text">{text}</div>

                {/* Anything Below here is next line */}
                <div className="reward-box-button">
                    <img src="/assets/images/icons/money.png" alt="Money Icon" />
                    <div className="reward-text">+{data.quests_reward}</div>
                </div>
            </div>

            <img className="arrow-right" src="/assets/images/ArrowRight.png"></img>
        </Button>
    );

    
    // <button className="box button disabled" onClick={onClick}>
    //     {text}
    // </button>
};

export default QuestsButton;
