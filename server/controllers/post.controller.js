const Post = require('../models/post');

// Read Post..
exports.readPost = function(req, res) {
    const postId = req.query.postId;

    // find Post by PostId..
    Post.find({_id: postId}, (err, post) => {
        if (err) return res.json({success: false, err});
        if (!post) return res.json({success: false, message: 'Post not found!'});

        res.status(200).json({
            success: true,
            post
        });
    });
};

// Read all posts..
exports.readAllPosts = function (req, res) {
    Post.find().sort([['createdAt', -1]]).exec((err, post) => {
        if (err) return res.send(err);
        res.status(200).send(post);
    });
};

// Current User Posts..
exports.currentUserPosts = function (req, res) {
    const currentLoggedInUserId = String(req.user._id);

    Post.find({ ownerId: currentLoggedInUserId }).sort([['createdAt', -1]]).exec((err, docs) => {
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
    const post = new Post(req.body);

    // if there is new post image update file to make it up..
    // and if no new update image file so don't need update extra..
    if (req.file !== undefined){
        post.image = req.file.originalname;
    }

    Post.findByIdAndUpdate({ _id: id }, post, { new: true }).then(docs => {
        res.status(200).json({
            success: true,
            docs
        });
    }).catch(err => {
        res.status(400).json({
            success: false,
            err
        });
    });
};

// Delete Post..
exports.deletePost = function (req, res) {
    const id = req.query.id;

    Post.findByIdAndDelete(id, (err) => {
        if (err) return res.status(400).json({deleted: false, err});
        res.status(200).json({
            deleted: true
        });
    });
};
