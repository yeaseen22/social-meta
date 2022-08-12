import React, { useState, useEffect } from 'react';
import { Modal, Card, CardHeader, CardContent, Avatar, TextareaAutosize } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../widgets/Button';
import { createComment } from '../../redux/actions/CommentAction';
import { userInfoById } from '../../redux/actions/UserActions';

// Comments making..
const MakeComments = (props) => {
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    // async-await function for async task..
    const dispatchUserByOwnerId = async () => {
        const { ownerId } = props;
        return await props.dispatch(userInfoById(ownerId));
    };

    // useEffect Hook..
    useEffect(() => {
        dispatchUserByOwnerId();
    }, []);

    // Let's try the IIFE Function..
    // Also Async-Await function to handle the async task..
    (async function () {
        if (props.User) {
            const { login: loginUser } = await props.User;
            if (loginUser) {
                setUserInfo(loginUser);
            }
        }
    })();

    // console.log('userInfo here -- ', userInfo);

    // ThemeMode..
    let themeMode = {};

    // Let's try the IIFE Function..
    // Also Async-Await function to handle the async task..
    (async function () {
        if (props.Settings) {
            if (props.Settings.themeMode) {
                const { backgroundColor, textColor, cardBorder, cardSubFontColor } = await props.Settings.themeMode;
                themeMode = {
                    backgroundColor,
                    textColor,
                    cardBorder,
                    cardSubFontColor
                };
            }
        }
    })();

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

    // Make Comments Function..
    const makeComment = async (comment) => {
        const { postId, ownerId, setCommentModal } = props;

        if (comment) {
            setIsLoading(true);
            await props.dispatch(createComment({ comment, ownerId, postId }));
            setComment('');
            props.setExpandedCommentArea(false);
            navigate(`/post/${postId}`);
        }
        // Set Loading to False..
        setTimeout(() => {
            setIsLoading(false);
            setCommentModal(false);
        }, 1000);
    };

    // console.log(userInfo);

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
                            src={userInfo.profilePhoto !== 'avatar' ? `/profileUpload/${userInfo.profilePhoto}`:'avatar'}
                        />
                    }
                    title={`${userInfo.firstname} ${userInfo.lastname}`}
                    subheader={userInfo.title}
                    subheaderTypographyProps={{ color: themeMode.cardSubFontColor }}
                />

                <CardContent>
                    {/* ---- Textarea of comment ---- */}
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Leave your comment here.."
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        style={{
                            width: 500,
                            fontSize: '18px',
                            borderRadius: '5px',
                            padding: '5px',
                            marginBottom: '10px',
                        }}
                    />

                    {/* ---- Comment ---- */}
                    <div style={{ marginBottom: '0.5rem' }}>
                        <CustomButton type={!isLoading ? 'COMMENT' : 'LOADING'} clickHandler={() => makeComment(comment)} />
                    </div>

                    {/* ---- Cancel ---- */}
                    <div>
                        <CustomButton type="CANCEL" clickHandler={() => props.setCommentModal(false)} />
                    </div>
                </CardContent>
            </Card>
        </Modal>
    );
};

// mapStateToProps here..
const mapStateToProps = (state) => {
    return {
        Settings: state.Settings,
        User: state.User
    };
};

export default connect(mapStateToProps)(MakeComments);
