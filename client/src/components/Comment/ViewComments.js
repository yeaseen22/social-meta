import React, { useEffect, useState } from 'react';
import { Avatar, Grid, Paper } from "@material-ui/core";
import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions/CommentAction';
import { HashSpinner } from '../widgets/SpinnersLoading';
import { Edit as EditIcon, Delete as DeleteIcon, ConstructionOutlined } from '@mui/icons-material';
import "../../css/ViewComments.css";
import EditCommentModal from './EditComment';


const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

// ViewComments Component..
const ViewComments = ({ setExpandedCommentArea, comments, ...props }) => {
    const [commentsUI, setCommentsUI] = useState([]);
    const [user, setUser] = useState({});
    const [showEditCommentModal, setEditCommentModal] = useState(false);

    useEffect(() => {
        setCommentsUI(comments);
    }, [comments]);

    // Delete Comment..
    const removeComment = async (commentId) => {
        const confirm = window.confirm('Are you sure want\'s to Remove this comment?');

        if (confirm) {
            await props.dispatch(deleteComment(commentId));
            setExpandedCommentArea(false);
            // window.location.reload();
        }
    };

    // Read Comments..
    const renderComments = (comments) => {
        if (!comments.length) {
            return <HashSpinner color="blue" size={50} />;
        }

        return comments.map(comment => {
            return (
                <Paper key={comment._id} style={{ padding: "40px 20px", marginTop: 10 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar 
                                alt="Remy Sharp" 
                                src={imgLink} 
                            />
                        </Grid>
    
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            {/* <h4 style={{ margin: 0, textAlign: "left" }}>{renderUsernameByOwnerId(comment.ownerId)}</h4> */}
                            {/* <h4 style={{ margin: 0, textAlign: "left" }}>Asad Anik</h4> */}
                            <p style={{ textAlign: "left" }}>
                                {comment.comment}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                posted 1 minute ago
                                {comment.updatedAt}
                            </p>
                        </Grid>
    
                        <Grid justifyContent="right" item>
                            {/* ---- Edit Comment Icon Button ---- */}
                            <div className="action-icons edit-icon">
                                <EditIcon
                                    style={{ fontSize: '20px' }}
                                    onClick={() => {
                                        setEditCommentModal(true);
                                    }}
                                />
    
                                {/* ---- Edit Comment ---- */}
                                <EditCommentModal
                                    showCommentModal={showEditCommentModal}
                                    setEditCommentModal={setEditCommentModal}
                                    currentComment={comment}
                                    setExpandedCommentArea={setExpandedCommentArea}
                                />
                            </div>
    
                            {/* ---- Delete Comment Icon Button ---- */}
                            <div className="action-icons delete-icon">
                                <DeleteIcon
                                    style={{ fontSize: '20px' }}
                                    onClick={() => removeComment(comment._id)}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            );
        });
    };

    // console.log('ViewComments -- ', props);
    // console.log('Our Comments -- ', comments);

    return (
        <div style={{ padding: 15 }} className="App">
            <h2>Comments</h2>
            {/* ---- Rendering the Comments ---- */}
            {renderComments(comments)}
        </div>
    );
};

// mapStateToProps..
const mapStateToProps = (state) => {
    return {
        Comment: state.Comment,
        User: state.User
    };
};

export default connect(mapStateToProps, null)(ViewComments);
