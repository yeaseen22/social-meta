import React from 'react';
import { Modal, Card, CardHeader, CardContent, TextareaAutosize } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../widgets/Button';
import { updateComment } from '../../redux/actions/CommentAction';

// Edit Comment Component..
const EditComment = ({ showCommentModal, setEditCommentModal, currentComment, setExpandedCommentArea, ...props }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [comment, setComment] = React.useState({});

    React.useEffect(() => {
        setComment(currentComment);

        // clean-up function..
        return () => {
            setComment({});
        };
    }, [currentComment]);

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

    // Update Comment..
    const updateAction = async (comment) => {
        await props.dispatch(updateComment({_id: comment._id, comment: comment.comment}));
        setIsLoading(true);
        setExpandedCommentArea(false);

        setTimeout(() => {
            setEditCommentModal(false);
        }, 1000);
    };

    // Returning Statement..
    return (
        <Modal
            open={showCommentModal}
            onClose={() => setEditCommentModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={style}>
                <CardHeader
                    title={`Edit Comment`}
                    subheaderTypographyProps={{ color: themeMode.cardSubFontColor }}
                />

                <CardContent>
                    {/* ---- Textarea of comment ---- */}
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Leave your comment here.."
                        value={comment.comment}
                        onChange={(event) => setComment({...comment, comment: event.target.value})}
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
                        <CustomButton type={!isLoading ? 'UPDATE' : 'LOADING'}
                            clickHandler={() => updateAction(comment)}
                        />
                    </div>

                    {/* ---- Cancel ---- */}
                    <div>
                        <CustomButton type="CANCEL" clickHandler={() => setEditCommentModal(false)} />
                    </div>
                </CardContent>
            </Card>
        </Modal>
    );
};

// MapStateToProps..
const mapStateToProps = (state) => {
    return {
        Settings: state.Settings
    };
};

export default connect(mapStateToProps, null)(EditComment);