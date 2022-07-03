import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { readPost } from '../../../redux/actions/PostActions';

const FoundPost = ({ handleClose, postId, body, image, ownerId }) => {
    // Naviagate..
    const navigate = useNavigate();

    // Make Body to Remove HTML tags from JS String..
    const plainBody = body.replace(/<\/?[^>]+(>|$)/g, "");

    // Truncate Function..
    // Just Showing the limited strings of post Body..
    const truncate = (text, N) => {
        return (text.length > N) ? text.substr(0, N-1) : text;
    };

    // Redirect to..
    const clickToRedirect = () => {
        navigate(`/post/${postId}`);
        handleClose();
    };

    // Search Box Design..
    const styleSearchResultBox = {
        border: '1px solid lightgray',
        borderRadius: 3,
        display: 'flex',
        marginBottom: '0.5rem',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
    };

    const styleResultChild = {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        cursor: 'pointer',
    };

    const styleImg = {
        height: 60,
        width: 60,
        borderRadius: 5
    };

    // Returning statement..
    return (
        <Box style={styleSearchResultBox}>
            {/* ---- Post Image ---- */}
            <div style={styleResultChild} onClick={clickToRedirect}>
                <img src={`/postUpload/${image}`} alt="Asad Anik" style={styleImg} />
            </div>

            {/* ---- Body Of Post */}
            <div style={styleResultChild} onClick={clickToRedirect}>
                <Typography id="modal-modal-title" variant="h6" component="h4">
                    {truncate(plainBody, 50)}
                </Typography>
            </div>
        </Box>
    );
};

export default FoundPost;