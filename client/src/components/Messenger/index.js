import React from 'react';
import Conversation from './Conversation';
import Message from './Message';
import ChatOnline from './ChatOnline';
import "../../css/messenger/messenger.css";

class Messenger extends React.Component{
    render(){
        // returninig statement..
        return (
            <div className="messenger">
                {/*----- Chat Menu ----*/}
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Search for friends" className="chatMenuInput" />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>

                {/*---- Chat Box ----*/}
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {/*---- Top ChatBox ----*/}
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                        </div>

                        {/*---- Bottom ChatBox ----*/}
                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="Write your message.."
                            >
                            </textarea>
                            <button className="chatSubmitButton">Send</button>
                        </div>
                    </div>
                </div>

                {/*---- Chat Online ----*/}
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        );
    }
}

export default Messenger;
