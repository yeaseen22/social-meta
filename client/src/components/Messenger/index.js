import React, { useState, useEffect } from 'react';
import Conversation from './Conversation';
import Message from './Message';
import ChatOnline from './ChatOnline';
import "../../css/messenger/messenger.css";
import { connect } from 'react-redux';
// import {} from '../../redux/actions/';

import axios from 'axios';

const Messenger = (props) => {
    const [conversations, setConversations] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [currentChat, setCurrentChat] = useState([]);
    const [messages, setMessages] = useState([]);

    /**
     * ---- useEffect HOOK ----
     * To getting conversations data with loggedIn user.
     */
    useEffect(() => {
        if (props.User){
            if (props.User.login){
                setCurrentUser(props.User.login);
                getConversations(props.User.login);
            }
        }

        // make cleanup..
        return () => {
            setCurrentUser({});
            setConversations([]);
        };
    }, [props.User.login]);

    /**
     * ---- useEffect HOOK ----
     * To getting messages with current chat's ID.
     */
    useEffect(() => {
        if (currentUser){
            getMessages(currentChat._id);
            console.log('Current Chat == ', currentChat._id);
        }

        // make cleanup..
        return () => {
            setMessages([]);
        };
    }, [currentChat]);


    // To getting conversation..
    const getConversations = async (loginUser) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/conversation/${loginUser.id}`);
            setConversations(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    // To getting messages..
    const getMessages = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/message/${id}`);

            console.log('The RESPONSE -- ', response);
            setMessages(response.data);

        } catch(error){
            console.log(error);
        }
    };


    /**
     * ---- Rendering Function for UI ----
     * ---- Conversations Rendering ----
     * @param conversations
     * @returns {JSX.Element|*}
     */
    const renderConversations = (conversations) => {
        if (!conversations.length){
            return (
                <div>
                    <h3>Loading..</h3>
                </div>
            );
        }else{
            return conversations.map((conv) => {
                return (
                    <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                        <Conversation
                            conversation={conv}
                            currentUser={currentUser}
                        />
                    </div>
                );
            });
        }
    };

    /**
     * ---- Rendering Function for UI ----
     * ---- Chats Messages Rendering -----
     * @param messages
     * @returns {JSX.Element|*}
     */
    const renderMessage = (messages) => {
        if (messages.length < 1) {
            return <span>Loading...</span>;
        }else{
            return messages.map(message => (
                <div key={message._id}>
                    <Message
                        message={message}
                        own={message.sender === currentUser.id}
                    />
                </div>
            ));
        }
    };

    /**
     * ---- Rendering Function for UI ----
     * ---- Current Chat Rendering ----
     * @param currentChat
     * @returns {JSX.Element}
     */
    const renderCurrentChat = (currentChat) => {
        if (currentChat.length < 1){
            return (
                <div>
                    <h3 className="noConversationText">Open conversation to start a chat.</h3>
                </div>
            );
        }else{
            return (
                <>
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
                        {renderMessage(messages)}
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
                </>
            );
        }
    };


    /**
     * ---- Console ----
     */
    console.log('Conversations -- ', conversations);
    console.log('current Chat -- ', currentChat);
    console.log('currrent User -- ', currentUser);
    console.log('Messages -- ', messages);

    // Return Statement..
    return (
        <div className="messenger">
            {/*----- Chat Menu ----*/}
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" placeholder="Search for friends" className="chatMenuInput" />
                    {renderConversations(conversations)}
                </div>
            </div>

            {/*---- Chat Box ----*/}
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {renderCurrentChat(currentChat)}
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
};

/**
 * ---- Map The Redux Stores Data Into Components Props ----
 * @param state
 * @returns {{User}}
 */
const mapStateToProps = (state) => {
    return {
        User: state.User
    };
};

export default connect(mapStateToProps, null)(Messenger);