import React from 'react';
import { Typography } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import "../../css/postUI.css";
import ViewComments from '../Comment/ViewComments';

// PostUI Component..
const PostUI = ({ body, image }) => {
    return (
        <div className="mainBox">
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

            {/* ---- Post Image ---- */}
            <div className="childBox">
                <img src={`/postUpload/${image}`} alt="Post Cover" style={{ maxWidth: 800 }} />
            </div>

            {/* ---- Post Body ---- */}
            <div className="childBox">
                {/* <h3>{ body }</h3> */}
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: body }} />
            </div>

            {/* ----- Comments Section ---- */}
            <div className="childBox">
                <ViewComments />
            </div>
        </div>
    );
};

export default PostUI;