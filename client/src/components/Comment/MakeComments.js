import React from 'react';
import { Modal, Card, CardHeader, CardContent, Avatar, TextareaAutosize } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../widgets/Button';

// Comments making..
const MakeComments = (props) => {
    // ThemeMode..
    let themeMode = {};

    if (props.Settings) {
        if (props.Settings.themeMode) {
            const { backgroundColor, textColor, cardBorder, cardSubFontColor } = props.Settings.themeMode;
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

    // returning statement..
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
                    {/* ---- Textarea of comment ---- */}
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Leave your comment here.."
                        style={{
                            width: 500,
                            fontSize: '18px',
                            borderRadius: '5px',
                            padding: '5px',
                            marginBottom: '10px',
                        }}
                    />

                    {/* ---- Comment ---- */}
                    <div style={{marginBottom: '0.5rem'}}>
                        <CustomButton type="COMMENT" clickHandler={() => alert('Make Comment')} />
                    </div>
                    
                    {/* ---- Cancel ---- */}
                    <div>
                        <CustomButton type="CANCEL" clickHandler={() => alert('Cancel Button')} />
                    </div>
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