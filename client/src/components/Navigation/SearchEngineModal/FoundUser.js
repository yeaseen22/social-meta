import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FoundUser = () => {
    // Naviagate..
    const navigate = useNavigate();

    // Redirect to..
    const clickToRedirect = () => {
        navigate(`/profile-others`);
    };

    // Search Box Design..
    const styleSearchResultBox = {
        border: '1px solid lightgray',
        borderRadius: 3,
        padding: 10,
        display: 'inline-flex',
        marginBottom: '0.5rem'
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
                <img src="" alt="Asad Anik" style={styleImg} />
            </div>

            {/* ---- Firstname & Lastname */}
            <div style={styleResultChild} onClick={clickToRedirect}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <span>Asad Anik</span>
                    <span>{" "}</span>
                    <span>(Engineer)</span>
                </Typography>

                {/* ---- Title ---- */}
                <Typography id="modal-modal-description" style={{ color: 'gray' }}>
                    <span>engr.asadanik@gmail.com</span>
                </Typography>
            </div>

            <div style={{paddingTop: '0.5rem'}}>
                <Button variant="outlined" startIcon={<AddIcon />}>
                    Follow
                </Button>
            </div>
        </Box>
    );
};

export default FoundUser;