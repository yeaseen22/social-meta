import React from 'react';
import "../../css/messenger/message.css";
import { format } from 'timeago.js';

const Message = ({ message, own }) => {
    // console.log('MSGS -- ', message);
    // console.log('OWN -->> ', own);

    if (message === undefined){
        return null;
    }else{
        return (
            <div className={own ? "message own" : "message"}>
                <div className="messageTop">
                    <img
                        className="messageImg"
                        src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/163254260/original/5a3f539f2ccafcc8b21870bab5ac69a5fc31259b/draw-a-personalized-pixel-art-avatar-of-you-in-my-style.png"
                        alt="avatar"
                    />
                    <p className="messageText">
                        {message.text}
                    </p>
                </div>
                <div className="messageBottom">{format(message.createdAt)}</div>
            </div>
        );
    }
};

export default Message;
