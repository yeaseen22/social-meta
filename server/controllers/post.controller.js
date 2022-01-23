const Post = require('../models/post');

// Current User Posts..
exports.currentUserPosts = function (req, res) {
    const currentLoggedInUserId = String(req.user._id);

    Post.find({ ownerId: currentLoggedInUserId }).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(docs);
    });
};

// Showing specific User Posts..
exports.specificUserPosts = function (req, res) {
    const userId = req.query.userId;

    Post.find({ ownerId: userId }).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(docs);
    });
};

// Create new Post..
exports.createPost = function (req, res) {
    const post = new Post(req.body);

    const currentLoggedInUserId = String(req.user._id);
    // post.set('ownerId', currentLoggedInUserId);
    post.ownerId = currentLoggedInUserId;
    post.image = req.file.originalname;

    post.save(function (error, docs) {
        if (error) return res.json({ success: false, error });
        res.status(200).json({
            success: true,
            docs
        });
    });
};

// Update Post..
exports.updatePost = function (req, res) {
    const id = req.body._id;
    const postBody = req.body;

    Post.findByIdAndUpdate({ _id: id }, postBody, { new: true }).then(docs => {
        res.status(200).json({
            success: true,
            docs
        });
    }).catch(err => {
        res.status(400).send(err);
    });
};

// Delete Post..
exports.deletePost = function (req, res) {
    const id = req.query.id;

    Post.findByIdAndDelete(id, (err) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(true);
    });
};
