import React from "react";
import { AvalorianDesignedSlider } from "../AvaloriansSlider";
import Image from "next/image";

interface FriendsProps {
    friend_ids: string[];
}

const FriendBar: React.FC<FriendsProps> = ({ friend_ids = [] }) => {
    return (
        <div className="friends-section curved-box">
            <div className="top-side">
                <div className="left-side">
                    <Image src="/assets/images/users.png" width={20} height={20} alt="users image icon"></Image>
                    <div className="base-text friends-text">{friend_ids.length} / 100 </div>
                </div>
            </div>
            <div className="bottom-side">
                <AvalorianDesignedSlider experience={friend_ids.length} level={friend_ids.length} nextLevelExp={[100]}></AvalorianDesignedSlider>
            </div>
        </div>
    );
};

export default FriendBar;
