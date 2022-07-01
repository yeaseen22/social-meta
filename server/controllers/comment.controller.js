const Comment = require('../models/comment');

// Make Comment...
exports.createComment = function(req, res){
    const comment = new Comment(req.body);

    // currentLoggedInUserId
    const currentLoggedInUserId = req.user._id;
    comment.ownerId = currentLoggedInUserId;
    // Also can do like this..
    // comment.set('ownerId', currentLoggedInUserId);

    comment.save(function(error, docs){
        if (error) return res.json({ success: false, error });
        res.status(200).json({
            success: true,
            docs
        });
    });
};

// Update Comment..
exports.updateComment = function(req, res){
    const id = req.body._id;
    const comment = new Comment(req.body);

    Comment.findByIdAndUpdate({ _id: id }, comment, { new: true }).then(docs => {
        res.status(200).json({
            success: true,
            docs
        });
    }).catch(error => {
        res.status(400).json({
            success: false,
            error
        });
    });
};

// Delete Comment..
exports.deleteComment = function(req, res){
    const id = req.query.id;

    Comment.findByIdAndDelete(id, function(error){
        if (error) return res.status(400).json({ deleted: false, error });
        res.status(200).json({
            deleted: true
        });
    });
};