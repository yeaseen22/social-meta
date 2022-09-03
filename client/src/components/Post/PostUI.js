import React from 'react';
import { Typography, Avatar } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import "../../css/postUI.css";
import ViewComments from '../Comment/ViewComments';

// PostUI Component..
const PostUI = ({ body, image, user, comments }) => {

    const renderUser = (USER) => {
        if (!USER){
            return (
                <div className="childBox header-box">
                    {/* Profile Picture */}
                    <div className="profileAvatar">
                        <img src={`/profileUpload/20220330_010309.jpg`} alt="" />
                    </div>
                    {/* Firstname & Lastname */}
                    <div className="profileText">
                        <Typography variant="text" className="username-text">
                            <span>Mohammad</span>
                            <span>{" "}</span>
                            <span>Asad</span>
                        </Typography>

                        <Typography variant="body2" className="title-text">
                            <span>{"Software Developer"}</span>
                        </Typography>
                    </div>

                    {/* Options Dot Menu */}
                    <div className="optionsDotMenu">
                        <MoreVertIcon />
                    </div>
                </div>
            );
        }
        if (USER){
            return (
                <div className="childBox header-box">
                    {/* Profile Picture */}
                    <div className="profileAvatar">
                        <Avatar
                            src={`/profileUpload/${USER.profilePhoto}`}
                            alt={USER.firstname}
                        />
                    </div>
                    {/* Firstname & Lastname */}
                    <div className="profileText">
                        <Typography variant="text" className="username-text">
                            <span>{USER.firstname}</span>
                            <span>{" "}</span>
                            <span>{USER.lastname}</span>
                        </Typography>

                        <Typography variant="body2" className="title-text">
                            <span>{USER.title}</span>
                        </Typography>
                    </div>

                    {/* Options Dot Menu */}
                    <div className="optionsDotMenu">
                        <MoreVertIcon />
                    </div>
                </div>
            );
        }
    };

    const renderPostImage = (img) => {
        if (!img){
            return null;
        }
        if (img){
            return (
                <div className="childBox">
                    <img src={`/postUpload/${image}`} alt="Post Cover" style={{ maxWidth: 800 }} />
                </div>
            );
        }
    };

    return (
        <div className="mainBox">
            {/* ---- USER Info ---- */}
            {renderUser(user)}

            {/* ---- Post Image ---- */}
            {renderPostImage(image)}

            {/* ---- Post Body ---- */}
            <div className="childBox">
                {/* <h3>{ body }</h3> */}
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: body }} />
            </div>

            {/* ----- Comments Section ---- */}
            <div className="childBox">
                <ViewComments
                    comments={comments}
                />
            </div>
        </div>
    );
};

export default PostUI;
