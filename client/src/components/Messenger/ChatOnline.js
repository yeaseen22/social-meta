import React, { useState, useEffect } from 'react';
import "../../css/messenger/chatOnline.css";
import axios from 'axios';

/**
 * ---- ChatOnline Component ----
 * @param onlineUsers
 * @param currentUserId
 * @param setCurrentChat
 * @returns {JSX.Element}
 * @constructor
 */
const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    /**
     * ----==== useEffect Hook for GetFriends ====----
     */
    useEffect(() => {
        const getFriends = async () => {
            try {
                if (currentUserId){
                    const response = await axios.get(`http://localhost:8080/api/friends/${currentUserId}`);
                    setFriends(response.data);
                }

            } catch(error){
                console.log(error);
            }
        };
        // calling this getFriends function..
        getFriends();

        // cleanup function..
        return () => {
            setFriends([]);
        };
    }, [currentUserId]);

    /**
     * ----==== useEffect Hook for Get OnlineFriends ====----
     */
    useEffect(() => {
        setOnlineFriends(friends.filter(F => onlineUsers.includes(F._id)));
    }, [friends, onlineUsers]);

    // log to seeing
    console.log('Friends == ', friends);
    console.log('OnlineFriends == ', onlineFriends);

    // const renderOnlineFriends = () => {
    //
    // };

    // Retruning statement..
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                {/*---- Online Chat Avatar and Badge -----*/}
                <div className="chatOnlineImgContainer">
                    <img
                        className="chatOnlineImg"
                        src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/163254260/original/5a3f539f2ccafcc8b21870bab5ac69a5fc31259b/draw-a-personalized-pixel-art-avatar-of-you-in-my-style.png"
                        alt=""
                    />
                    <div className="chatOnlineBadge"></div>
                </div>

                {/*----- Online User Name -----*/}
                <span className="chatOnlineName">John Doe</span>
            </div>
        </div>
    );
};

export default ChatOnline;
