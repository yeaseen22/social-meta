import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FoundUser = ({ handleClose, userId, firstname, lastname, email, title, profilePhoto }) => {
    // Naviagate..
    const navigate = useNavigate();

    // Redirect to..
    const clickToRedirect = () => {
        navigate(`/profile-others/${userId}`);
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
        justifyContent: 'space-between'
    };

    const styleResultChild = {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        cursor: 'pointer',
    };

    const styleImg = {
        height: 50,
        width: 50,
        borderRadius: 50
    };

    // Returning statement..
    return (
        <Box style={styleSearchResultBox}>
            {/* ---- Profile Image ---- */}
            <div style={styleResultChild} onClick={clickToRedirect}>
                <img src={`/profileUpload/${profilePhoto}`} alt="Asad Anik" style={styleImg} />
            </div>

            {/* ---- Firstname & Lastname */}
            <div style={styleResultChild} onClick={clickToRedirect}>
                <Typography id="modal-modal-title" variant="h6" component="h3">
                    <span>{firstname}<span>{" "}</span>{lastname}</span>
                </Typography>

                {/* ---- Title ---- */}
                <Typography id="modal-modal-description" style={{ color: 'gray' }}>
                    <span>{title}</span>
                </Typography>
            </div>

            <div style={{paddingTop: '0.5rem', paddingRight: '1rem'}}>
                <Button variant="outlined" startIcon={<AddIcon />}>
                    Follow
                </Button>
            </div>
        </Box>
    );
};

export default FoundUser;