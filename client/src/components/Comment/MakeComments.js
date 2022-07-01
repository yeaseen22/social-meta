import React from 'react';
import { Modal, Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { connect } from 'react-redux';

const MakeComments = (props) => {
    // ThemeMode..
    let themeMode = {};

    if (props.Settings){
        if (props.Settings.themeMode){
            const { backgroundColor, textColor, cardBorder, cardSubFontColor} = props.Settings.themeMode;
            themeMode = {
                backgroundColor,
                textColor,
                cardBorder,
                cardSubFontColor
            };
        }
    }

    // Global style for Modal..
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: themeMode.backgroundColor,
        color: themeMode.textColor,
        boxShadow: 24,
        border: themeMode.cardBorder
    };

    return (
        <Modal
            open={props.showModal}
            onClose={() => props.setCommentModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={style}>
                <CardHeader
                    avatar={
                        <Avatar
                            alt={'No User'}
                            src={''}
                        />
                    }
                    title={'Asad Anik'}
                    subheader={'My Subheader'}
                    subheaderTypographyProps={{ color: themeMode.cardSubFontColor }}
                />

                <CardContent>
                    <h2>Hi all</h2>
                </CardContent>
            </Card>
        </Modal>
    );
};

// mapStateToProps here..
const mapStateToProps = (state) => {
    return {
        Settings: state.Settings
    };
};

export default connect(mapStateToProps)(MakeComments);