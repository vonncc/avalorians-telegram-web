import React from "react";
import "@/app/styles/pages/friends.css";
import FriendBar from "../elements/Friends/FriendBar";
import { Button } from "@nextui-org/button";

const Friends = () => {
    return (
        <div className="friends-container">
            <FriendBar friend_ids={["1", "2"]}></FriendBar>
            <Button className="base-text box-button add-friend">
                INVITE FRIENDS
            </Button>
            <div className="base-text">MY FRIENDS</div>
        </div>
    );
};

export default Friends;
