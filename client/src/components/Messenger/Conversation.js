import React from 'react';
import "../../css/messenger/conversation.css";

const Conversation = () => {
    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/163254260/original/5a3f539f2ccafcc8b21870bab5ac69a5fc31259b/draw-a-personalized-pixel-art-avatar-of-you-in-my-style.png"
                alt="avatar"
            />
            <span className="conversationName">John Doe</span>
        </div>
    );
};

export default Conversation;
