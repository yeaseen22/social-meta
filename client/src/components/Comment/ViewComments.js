import React, { useEffect, useState } from "react";
import { Avatar, Grid, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteComment } from "../../redux/actions/CommentAction";
import NotFound from "../widgets/NotFound";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import "../../css/ViewComments.css";
import EditCommentModal from "./EditComment";

// ViewComments Component..
const ViewComments = ({ setExpandedCommentArea, comments, ...props }) => {
  const [commentsUI, setCommentsUI] = useState([]);
  const [showEditCommentModal, setEditCommentModal] = useState(false);
  const [selectedComment, setSelectedComment] = React.useState({});
  let navigate = useNavigate();

    //#region formatDate function..
const formatDate = (dateString) => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true // Change to false for 24-hour format
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

  // #region timeAgo function..
  const timeAgo = (dateString) => {
    const secondsAgo = Math.floor((new Date() - new Date(dateString)) / 1000);
    let interval = Math.floor(secondsAgo / 31536000);

    if (interval >= 1)
      return interval === 1 ? "1 year ago" : `${interval} years ago`;
    interval = Math.floor(secondsAgo / 2592000); // 30 days
    if (interval >= 1)
      return interval === 1 ? "1 month ago" : `${interval} months ago`;
    interval = Math.floor(secondsAgo / 86400); // 1 day
    if (interval >= 1)
      return interval === 1 ? "1 day ago" : `${interval} days ago`;
    interval = Math.floor(secondsAgo / 3600); // 1 hour
    if (interval >= 1)
      return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
    interval = Math.floor(secondsAgo / 60); // 1 minute
    if (interval >= 1)
      return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
    return secondsAgo === 1 ? "1 second ago" : `${secondsAgo} seconds ago`;
  };

  useEffect(() => {
    setCommentsUI(comments);

    // cleanup function..
    return () => {
      setCommentsUI([]);
    };
  }, []);

  // Delete Comment..
  const removeComment = async (commentId, commentsPost) => {
    const confirm = window.confirm(
      "Are you sure want's to Remove this comment?"
    );

    if (confirm) {
      await props.dispatch(deleteComment(commentId));
      setExpandedCommentArea(false);
      // window.location.reload();
      navigate(`/post/${commentsPost}`);
    }
  };

  // Read Comments..
  const renderComments = (comments) => {
    if (!comments) {
      return <NotFound msg={"No Comments"} color={"grey"} size={50} />;
    }

    return comments.map((comment) => {
      // Grave the user from comments > comment..
      const { user } = comment;
      const { id: loggedInUserId } = props.User.login;

      return (
        <Paper
          key={comment._id}
          style={{ padding: "40px 20px", marginTop: 10 }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar
                alt={`${user.firstname} ${user.lastname}`}
                src={`/profileUpload/${user.profilePhoto}`}
              />
            </Grid>

            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>
                <span>{user.firstname}</span>
                <span> </span>
                <span>{user.lastname}</span>
              </h4>
              <p style={{ textAlign: "left" }}>{comment.comment}</p>
              <p style={{ textAlign: "left", color: "gray" }}>
                {/* posted 1 minute ago 
                                <br/>
                                {comment.updatedAt} */}
                {/* Posted {formatDate(comment.updatedAt)} */}
                Posted {timeAgo(comment.updatedAt)} {/* Calculate time ago */}
                {formatDate(comment.updatedAt)}

              </p>
            </Grid>

            {user._id === loggedInUserId && (
              <Grid justifyContent="right" item>
                {/* ---- Edit Comment Icon Button ---- */}
                <div className="action-icons edit-icon">
                  <EditIcon
                    style={{ fontSize: "20px" }}
                    onClick={() => {
                      setEditCommentModal(true);
                      setSelectedComment(comment);
                    }}
                  />

                  {/* ---- Edit Comment ---- */}
                  <EditCommentModal
                    showCommentModal={showEditCommentModal}
                    setEditCommentModal={setEditCommentModal}
                    currentComment={selectedComment}
                    setExpandedCommentArea={setExpandedCommentArea}
                  />
                </div>

                {/* ---- Delete Comment Icon Button ---- */}
                <div className="action-icons delete-icon">
                  <DeleteIcon
                    style={{ fontSize: "20px" }}
                    onClick={() => removeComment(comment._id, comment.post)}
                  />
                </div>
              </Grid>
            )}
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
      {renderComments(commentsUI)}
    </div>
  );
};

// mapStateToProps..
const mapStateToProps = (state) => {
  return {
    Comment: state.Comment,
    User: state.User,
  };
};

export default connect(mapStateToProps, null)(ViewComments);
