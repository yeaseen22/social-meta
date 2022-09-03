import React from 'react';
import "../../css/messenger/message.css";

const Message = ({ own }) => {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/163254260/original/5a3f539f2ccafcc8b21870bab5ac69a5fc31259b/draw-a-personalized-pixel-art-avatar-of-you-in-my-style.png"
                    alt="avatar"
                />
                <p className="messageText">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, illum incidunt inventore necessitatibus nemo nobis nostrum obcaecati quibusdam quod, recusandae rem soluta, velit vitae? Dolor numquam optio quas quis saepe!
                </p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    );
};

export default Message;
